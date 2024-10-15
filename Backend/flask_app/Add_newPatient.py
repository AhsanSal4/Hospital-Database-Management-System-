from flask import Flask, request, jsonify
import mysql.connector as myc
import random

app = Flask(__name__)

# Function to add new patient (Flask version)
@app.route('/add_patient', methods=['POST'])
def add_new_patient():
    try:
        # Connect to the database
        db = myc.connect(host='localhost', user='root', port='3306', passwd='mysql123', database='micro_project')
        cur = db.cursor()

        # Helper functions to pad or format strings
        def gender_(g):
            return g.ljust(6)  # Pad to 6 characters for gender

        def p_name(p):
            return p.ljust(20)  # Pad to 20 characters for patient name

        def symptom_(s):
            return s.ljust(20)  # Pad to 20 characters for symptoms

        # Get data from the request (assuming JSON input)
        data = request.json
        patient_name = data.get('patient_name')
        mobile_no = data.get('mobile_no')
        gender = data.get('gender')
        age = data.get('age')
        height_cm = data.get('height_cm')
        weight_kg = data.get('weight_kg')
        dt_admit = data.get('date_admit')
        symptom = data.get('symptom')
        dr_id = data.get("dr_id")

        # Call helper functions to adjust the data
        p = p_name(patient_name)
        g = gender_(gender)
        s = symptom_(symptom)

        # Generate a random patient code
        p_code = (
            random.choice('ABCDEFCGHIJKLMNOPQRSTUVWXYZ') +
            ''.join(random.choices('1234567890', k=5))
        )

        # Insert query for patient details
        query = """
        INSERT INTO Patient (p_id, p_name, ph_no, gender, age, height, weight, dt_admit, disease, med_prescribed, dr_id)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        values = (p_code, p, mobile_no, g, age, height_cm, weight_kg, dt_admit, s, ' ', dr_id)

        cur.execute(query, values)
        db.commit()

        # Return success response
        return jsonify({
            'message': f'{cur.rowcount} record(s) inserted',
            'p_code': p_code
        }), 200

    except Exception as error:
        # Return error response
        return jsonify({'error': str(error)}), 500

    finally:
        # Close cursor and connection
        cur.close()
        db.close()

# Run Flask app
if __name__ == '__main__':
    app.run(debug=True)
