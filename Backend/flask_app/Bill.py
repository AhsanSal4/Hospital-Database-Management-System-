from flask import Flask, request, jsonify
import mysql.connector as myc
import datetime
import random

app = Flask(__name__)

# Helper function to convert tuple to string
def tup_str(T):
    return ''.join(T) if T else ''

# Route to get patient details
# Route to get patient details (with Bill included)
@app.route('/get-patient-details/<p_code>', methods=['GET'])
def get_patient_details(p_code): 
    try:
        # Connect to the database
        db = myc.connect(host='localhost', user='root', port='3306', passwd='mysql123', database='micro_project')
        cur = db.cursor()

        # Fetch patient details (including Bill)
        q_patient = f"SELECT * FROM Patients WHERE P_id='{p_code}'"
        cur.execute(q_patient)
        patient_details = cur.fetchone()

        if patient_details:
            patient_data = {
                "P_id": patient_details[0],
                "P_name": patient_details[1],
                "Age": patient_details[6],
                "Gender": patient_details[5],
                "Height_cm": patient_details[3],
                "Weight_kg": patient_details[4],
                "Dt_admit": patient_details[7],
                "Disease": patient_details[8],
                "Med_prescribed": patient_details[9],
                "Dr_id": patient_details[11],
                "Bill": patient_details[13]  # Fetch the Bill from the Patients table
            }
            return jsonify({"success": True, "patient": patient_data}), 200
        else:
            return jsonify({"success": False, "message": "Patient not found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        cur.close()
        db.close()


# Route for generating a bill
@app.route('/generate_bill', methods=['POST'])
def generate_bill():
    try:
        # Connect to the database
        db = myc.connect(host='localhost', user='root', port='3306', passwd='mysql123', database='micro_project')
        cur = db.cursor()

        # Get data from request (assuming JSON input)
        data = request.json
        p_code = data.get('p_code')
        quantity = data.get('quantity')

        # Fetch patient name
        q_patient = f"SELECT P_name FROM Patients WHERE P_id='{p_code}'"
        cur.execute(q_patient)
        patient_name = tup_str(cur.fetchone())

        # Fetch patient age
        q_age = f"SELECT Age FROM Patients WHERE P_id='{p_code}'"
        cur.execute(q_age)
        patient_age = tup_str(cur.fetchone())

        # Fetch doctor name
        q_doctor = f"""
            SELECT Doctors.Dr_name FROM Patients 
            JOIN Doctors ON Doctors.Dr_id = Patients.Dr_id
            WHERE P_id='{p_code}'
        """
        cur.execute(q_doctor)
        doctor_name = tup_str(cur.fetchone())

        # Fetch medicine details
        q_medicine = f"SELECT Med_prescribed FROM Patients WHERE P_id='{p_code}'"
        cur.execute(q_medicine)
        medicine_name = tup_str(cur.fetchone())

        # Fetch medicine code and price
        q_med_code = f"SELECT M_id FROM Medicine WHERE M_name='{medicine_name}'"
        cur.execute(q_med_code)
        med_code = tup_str(cur.fetchone())

        q_price = f"SELECT price FROM Medicine WHERE M_name='{medicine_name}'"
        cur.execute(q_price)
        price = int(tup_str(cur.fetchone()))

        # Calculate bill details
        mrp = price * quantity
        tax = mrp * 0.08
        discount = mrp * 0.03
        total = mrp + tax - discount
        sgst = total * 0.05
        cgst = total * 0.05

        # Generate a random Bill Number
        bill_no = ''.join(random.choices('1234567890', k=10))

        # Get current date and time
        current_time = datetime.datetime.now()

        # Return the bill details as JSON
        bill_details = {
            "hospital_name": "ABC Hospital",
            "pharmacy": "Pharmacy",
            "address": "Near Malabar House",
            "contact_no": "+91 9074938234",
            "email": "Qwertyasdf123@gmail.com",
            "date": str(current_time.date()),
            "time": current_time.strftime("%H:%M:%S"),
            "bill_no": bill_no,
            "patient_name": patient_name,
            "age": patient_age,
            "doctor_name": doctor_name,
            "medicine": {
                "name": medicine_name,
                "price_per_unit": price,
                "batch": med_code,
                "quantity": quantity,
                "mrp": mrp,
                "discount": round(discount, 2),
                "tax": round(tax, 2),
                "total": round(total, 2)
            },
            "sgst": round(sgst, 2),
            "cgst": round(cgst, 2),
            "net_price": round(total, 2)
        }

        return jsonify(bill_details), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        cur.close()
        db.close()

# Route for fetching doctor details
# Route for fetching doctor details
@app.route('/get-doctor-fee/<dr_id>', methods=['GET'])
def get_doctor_details(dr_id):
    try:
        # Connect to the database
        db = myc.connect(host='localhost', user='root', port='3306', passwd='mysql123', database='micro_project')
        cur = db.cursor()

        # Debugging log for doctor ID
        print(f"Fetching details for doctor with Dr_id: {dr_id}")

        # Fetch doctor details using the doctor ID
        q_doctor = f"SELECT Dr_name, fees FROM Doctors WHERE Dr_id='{dr_id}'"
        cur.execute(q_doctor)

        # Fetch the result
        doctor_data = cur.fetchone()

        # Debugging: check what data is returned
        if doctor_data:
            print(f"Doctor Data Fetched: {doctor_data}")

            # Check if Dr_name or fee is None
            if doctor_data[0] is None or doctor_data[1] is None:
                print(f"Warning: Doctor name or fee is None for Dr_id: {dr_id}")

            doctor_details = {
                "Dr_id": dr_id,
                "Dr_name": doctor_data[0] if doctor_data[0] is not None else "N/A",
                "fees": doctor_data[1] if doctor_data[1] is not None else 0  # default to 0 if fee is None
            }
            return jsonify({"success": True, "doctor": doctor_details}), 200
        else:
            print(f"No doctor found with Dr_id: {dr_id}")  # Log message for not found
            return jsonify({"success": False, "message": "Doctor not found"}), 404

    except Exception as e:
        # Detailed error logging
        print(f"Error fetching doctor details: {str(e)}")
        return jsonify({"error": str(e)}), 500

    finally:
        cur.close()
        db.close()

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
