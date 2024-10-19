from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector as myc
import random
from datetime import datetime

app = Flask(__name__)
CORS(app, resources={r"/add_patient": {"origins": "http://localhost:5173"}})

@app.route('/add_patient', methods=['POST', 'OPTIONS'])  # Handle OPTIONS method
def add_new_patient():
    if request.method == 'OPTIONS':
        # CORS preflight request
        response = app.make_default_options_response()
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
        response.headers.update(headers)
        return response

    db = None
    cur = None
    try:
        # Actual POST request logic goes here
        # Connect to the database
        db = myc.connect(host='localhost', user='root', port='3306', passwd='Nibhin@137', database='hospital')
        cur = db.cursor()

        # Extract data from request body
        data = request.json
        patient_name = data.get('patient_name')
        mobile_no = data.get('mobile_no')
        gender = data.get('gender')
        age = data.get('age')
        height_cm = data.get('height_cm')
        weight_kg = data.get('weight_kg')
        dt_admit = data.get('date_admit')
        symptom = data.get('symptom')
        username = data.get('username')
        password = data.get('password')
        dr_id = data.get("dr_id")

        # Generate random park_id
        park_id = generate_park_id()
        cur.execute("INSERT INTO Parking (park_id, owner) VALUES (%s, %s)", (park_id, 'PATIENT'))

        # Insert login credentials into the login table
        cur.execute("INSERT INTO login (username, pwd, role, last_login) VALUES (%s, %s, %s, %s)", 
                    (username, password, patient_name, dt_admit))

        # Insert patient details into the Patient table
        p_code = generate_random_code()
        cur.execute("""
        INSERT INTO Patients (p_id, p_name, ph_no, gender, age, height_cm, weight_kg, dt_admit, disease, med_prescribed, username, dr_id, park_id)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (p_code, patient_name, mobile_no, gender, age, height_cm, weight_kg, dt_admit, symptom, None, username, dr_id, park_id))

        db.commit()
        return jsonify({
            'message': 'Patient registered successfully',
            'patient_code': p_code,
            'park_id': park_id
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        # Safely close the cursor and connection if they were created
        if cur:
            cur.close()
        if db:
            db.close()

def generate_park_id():
    return random.choice('ABCDEFGHIJKLMNOPQRSTUVWXYZ') + ''.join(random.choices('0123456789', k=3))

def generate_random_code():
    return random.choice('ABCDEFGHIJKLMNOPQRSTUVWXYZ') + ''.join(random.choices('0123456789', k=5))

if __name__ == '__main__':
    app.run(debug=True)
