from flask import Flask, request, jsonify
import mysql.connector as myc
import datetime
import random

app = Flask(__name__)

# Helper function to convert tuple to string
def tup_str(T):
    return ''.join(T)

# Route for generating a bill
@app.route('/generate_bill', methods=['POST'])
def generate_bill():
    try:
        # Connect to the database
        db = myc.connect(host='localhost', user='root', port='3306', passwd='Nibhin@137', database='hospital')
        cur = db.cursor()

        # Get data from request (assuming JSON input)
        data = request.json
        p_code = data.get('p_code')
        quantity = data.get('quantity')

        # Fetch patient name
        q_patient = f"SELECT Patient_name FROM Patient WHERE P_code='{p_code}'"
        cur.execute(q_patient)
        patient_name = tup_str(cur.fetchone())

        # Fetch patient age
        q_age = f"SELECT Age FROM Patient WHERE P_code='{p_code}'"
        cur.execute(q_age)
        patient_age = tup_str(cur.fetchone())

        # Fetch doctor name
        q_doctor = f"""
            SELECT Doctor.dr_name FROM Patient 
            JOIN Doctor ON Doctor.dr_id = Patient.dr_id
            WHERE P_code='{p_code}'
        """
        cur.execute(q_doctor)
        doctor_name = tup_str(cur.fetchone())

        # Fetch medicine details
        q_medicine = f"SELECT Med_Prescribed FROM Patient WHERE P_code='{p_code}'"
        cur.execute(q_medicine)
        medicine_name = tup_str(cur.fetchone())

        # Fetch medicine code and price
        q_med_code = f"SELECT M_code FROM Medicine WHERE Med_Name='{medicine_name}'"
        cur.execute(q_med_code)
        med_code = tup_str(cur.fetchone())

        q_price = f"SELECT Price FROM Medicine WHERE Med_Name='{medicine_name}'"
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

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
