from flask import Flask, jsonify, request
import MySQLdb

app = Flask(__name__)

# Connect to the MySQL database
def get_db_connection():
    return MySQLdb.connect(
        host="localhost",
        user="root",
        passwd="Nibhin@137",
        db="hospital"
    )

# Route to fetch patients for a specific doctor
@app.route('/get_patients/<doctor_username>', methods=['GET'])
def get_patients(doctor_username):
    conn = get_db_connection()
    cursor = conn.cursor(MySQLdb.cursors.DictCursor)

    try:
        # Fetch patients assigned to the doctor
        cursor.execute(""" 
            SELECT * FROM patients 
            WHERE Dr_id = (SELECT Dr_id FROM doctors WHERE Username = %s)
        """, (doctor_username,))
        patients = cursor.fetchall()

        return jsonify({'patients': patients}), 200
    except MySQLdb.Error as e:
        print(f"Error: {e}")
        return jsonify({'error': 'Database query failed'}), 500
    finally:
        cursor.close()
        conn.close()

# Route to fetch medicines from the medicine table
@app.route('/get_medicines', methods=['GET'])
def get_medicines():
    conn = get_db_connection()
    cursor = conn.cursor(MySQLdb.cursors.DictCursor)

    try:
        # Fetch all medicines from the medicine table
        cursor.execute("SELECT * FROM medicine")
        medicines = cursor.fetchall()

        return jsonify({'medicines': medicines}), 200
    except MySQLdb.Error as e:
        print(f"Error: {e}")
        return jsonify({'error': 'Database query failed'}), 500
    finally:
        cursor.close()
        conn.close()

# Route to handle patient analysis submission
@app.route('/submit_analysis', methods=['POST'])
def submit_analysis():
    data = request.json
    patient_id = data.get('patientID')
    analysis_notes = data.get('analysisNotes')

    if not patient_id or not analysis_notes:
        return jsonify({'error': 'Patient ID and analysis notes are required'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # Update the patient's analysis notes in the database
        cursor.execute("UPDATE patients SET Analysis_Notes = %s WHERE P_id = %s", (analysis_notes, patient_id))
        conn.commit()

        return jsonify({'message': 'Analysis submitted successfully'}), 200
    except MySQLdb.Error as e:
        print(f"Error: {e}")
        return jsonify({'error': 'Database update failed'}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/prescribe_medicine', methods=['POST'])
def prescribe_medicine():
    data = request.json
    patient_id = data.get('patientID')
    medicines = data.get('medicines')  # Array of selected medicines

    if not patient_id or not medicines:
        return jsonify({'error': 'Patient ID and medicines are required'}), 400

    print(f"Medicines passed in the request: {medicines}")  # Debugging log

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # Dynamically create placeholders for the number of medicines
        placeholders = ', '.join(['%s'] * len(medicines))
        sql_query = f"SELECT M_name FROM medicine WHERE M_name IN ({placeholders})"
        print(f"SQL Query: {sql_query}, Params: {tuple(medicines)}")  # Debugging log
        cursor.execute(sql_query, tuple(medicines))
        medicine_details = cursor.fetchall()

        print(f"Medicine Details fetched: {medicine_details}")  # Debugging log

        if not medicine_details:
            return jsonify({'error': 'Invalid medicine names provided'}), 400

        # Convert list of medicine names to a string
        medicines_str = ', '.join([medicine['M_name'] for medicine in medicine_details])

        if not medicines_str:
            return jsonify({'error': 'No valid medicine names found'}), 400

        # Prescribe medicines to the patient (update the Med_prescribed field)
        cursor.execute("UPDATE patients SET Med_prescribed = %s WHERE P_id = %s", (medicines_str, patient_id))
        conn.commit()

        # Fetch the doctor's fee from the doctors table
        cursor.execute(""" 
            SELECT Dr_id FROM patients WHERE P_id = %s
        """, (patient_id,))
        patient = cursor.fetchone()

        if patient:
            doctor_id = patient['Dr_id']
            cursor.execute(""" 
                SELECT fees FROM doctors WHERE Dr_id = %s
            """, (doctor_id,))
            doctor_fee = cursor.fetchone()

            if not doctor_fee:
                return jsonify({'error': 'Doctor fee not found'}), 404

            # Fetch the total price of selected medicines
            cursor.execute(""" 
                SELECT price FROM medicine WHERE M_name IN (%s)
            """, (', '.join([f"'{medicine['M_name']}'" for medicine in medicine_details]),))
            medicine_prices = cursor.fetchall()

            # Calculate total bill before GST
            total_medicine_price = sum([medicine['price'] for medicine in medicine_prices])
            total_bill_before_gst = doctor_fee['fees'] + total_medicine_price

            # Apply GST (for example, 18%)
            gst = 0.18 * total_bill_before_gst
            total_bill = total_bill_before_gst + gst

            return jsonify({
                'message': 'Medicines prescribed and bill generated successfully',
                'total_bill': total_bill,
                'gst': gst,
                'doctor_fee': doctor_fee['fees'],
                'medicines': medicines_str
            }), 200
        else:
            return jsonify({'error': 'Patient not found'}), 404

    except MySQLdb.Error as e:
        print(f"Error: {e}")
        return jsonify({'error': 'Database update failed'}), 500
    finally:
        cursor.close()
        conn.close()

# Route to handle bill approval submission
@app.route('/approve_bill', methods=['POST'])
def approve_bill():
    data = request.json
    patient_id = data.get('patientID')
    bill_amount = data.get('billAmount')

    if not patient_id or not bill_amount:
        return jsonify({'error': 'Patient ID and bill amount are required'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # Fetch the doctor's fee from the doctors table
        cursor.execute(""" 
            SELECT fees FROM doctors WHERE Dr_id = (SELECT Dr_id FROM patients WHERE P_id = %s)
        """, (patient_id,))
        doctor_fee = cursor.fetchone()

        if not doctor_fee:
            return jsonify({'error': 'Doctor fee not found'}), 404

        # Fetch the total price of selected medicines
        cursor.execute(""" 
            SELECT price FROM medicine 
            WHERE M_name IN (SELECT M_name FROM medicines_prescribed WHERE P_id = %s)
        """, (patient_id,))
        medicine_prices = cursor.fetchall()

        # Calculate total bill before GST
        total_medicine_price = sum([medicine['price'] for medicine in medicine_prices])
        total_bill_before_gst = doctor_fee['fees'] + total_medicine_price

        # Apply GST (for example, 18%)
        gst = 0.18 * total_bill_before_gst
        total_bill = total_bill_before_gst + gst + bill_amount  # Adding additional bill amount (for any other charges)

        # Update the patient's bill details in the database
        cursor.execute("UPDATE patients SET Bill_Approved = 1, Bill_Amount = %s WHERE P_id = %s", (total_bill, patient_id))
        conn.commit()

        return jsonify({
            'message': 'Bill approved successfully',
            'total_bill': total_bill,
            'gst': gst,
            'doctor_fee': doctor_fee['fees'],
            'medicine_prices': [medicine['price'] for medicine in medicine_prices]
        }), 200
    except MySQLdb.Error as e:
        print(f"Error: {e}")
        return jsonify({'error': 'Database update failed'}), 500
    finally:
        cursor.close()
        conn.close()

if __name__ == '__main__':
    app.run(debug=True)
