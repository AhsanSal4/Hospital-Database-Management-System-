from flask import Flask, jsonify, request
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# Function to connect to the MySQL database
def get_db_connection():
    conn = mysql.connector.connect(
        host='localhost',
        user='root',
        password='Nibhin@137',  # Replace with your MySQL password
        database='hospital'
    )
    return conn

# Route to get patient details by patient ID
@app.route('/patient/<p_id>', methods=['GET'])
def get_patient(p_id):
    db = None
    cur = None
    try:
        # Connect to the database
        db = get_db_connection()
        cur = db.cursor(dictionary=True)

        # Fetch the patient details using the P_id
        query = "SELECT * FROM patients WHERE P_id = %s"
        cur.execute(query, (p_id,))
        patient = cur.fetchone()

        if not patient:
            return jsonify({'error': 'Patient not found'}), 404

        return jsonify(patient), 200

    except Exception as error:
        return jsonify({'error': str(error)}), 500

    finally:
        if cur:
            cur.close()
        if db:
            db.close()

# Route to add a new patient
@app.route('/patient', methods=['POST'])
def add_patient():
    db = None
    cur = None
    try:
        data = request.get_json()
        P_id = data.get('P_id')
        P_name = data.get('P_name')
        Ph_No = data.get('Ph_No')
        Height_cm = data.get('Height_cm')
        Weight_kg = data.get('Weight_kg')
        Gender = data.get('Gender')
        Age = data.get('Age')
        Dt_admit = data.get('Dt_admit')
        Disease = data.get('Disease')
        Med_prescribed = data.get('Med_prescribed')
        Username = data.get('Username')
        Dr_id = data.get('Dr_id')
        Park_id = data.get('Park_id')

        # Validate required fields
        if not all([P_id, P_name, Ph_No, Gender, Age, Dt_admit, Username]):
            return jsonify({'error': 'All required fields must be filled'}), 400

        # Connect to the database
        db = get_db_connection()
        cur = db.cursor()

        # Insert patient data into the patients table
        query = """
        INSERT INTO patients (P_id, P_name, Ph_No, Height_cm, Weight_kg, Gender, Age, Dt_admit, Disease, Med_prescribed, Username, Dr_id, Park_id)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        values = (P_id, P_name, Ph_No, Height_cm, Weight_kg, Gender, Age, Dt_admit, Disease, Med_prescribed, Username, Dr_id, Park_id)
        cur.execute(query, values)
        db.commit()

        return jsonify({'message': 'Patient record inserted successfully'}), 201

    except Exception as error:
        return jsonify({'error': str(error)}), 500

    finally:
        if cur:
            cur.close()
        if db:
            db.close()

# Route to update patient information
@app.route('/patient/<p_id>', methods=['PUT'])
def update_patient(p_id):
    db = None
    cur = None
    try:
        data = request.get_json()
        P_name = data.get('P_name')
        Ph_No = data.get('Ph_No')
        Height_cm = data.get('Height_cm')
        Weight_kg = data.get('Weight_kg')
        Gender = data.get('Gender')
        Age = data.get('Age')
        Dt_admit = data.get('Dt_admit')
        Disease = data.get('Disease')
        Med_prescribed = data.get('Med_prescribed')
        Dr_id = data.get('Dr_id')
        Park_id = data.get('Park_id')

        # Connect to the database
        db = get_db_connection()
        cur = db.cursor()

        # Update patient record in the patients table
        query = """
        UPDATE patients
        SET P_name = %s, Ph_No = %s, Height_cm = %s, Weight_kg = %s, Gender = %s, Age = %s, Dt_admit = %s, Disease = %s, Med_prescribed = %s, Dr_id = %s, Park_id = %s
        WHERE P_id = %s
        """
        values = (P_name, Ph_No, Height_cm, Weight_kg, Gender, Age, Dt_admit, Disease, Med_prescribed, Dr_id, Park_id, p_id)
        cur.execute(query, values)
        db.commit()

        return jsonify({'message': 'Patient record updated successfully'}), 200

    except Exception as error:
        return jsonify({'error': str(error)}), 500

    finally:
        if cur:
            cur.close()
        if db:
            db.close()

# Route to delete a patient record by patient ID
@app.route('/patient/<p_id>', methods=['DELETE'])
def delete_patient(p_id):
    db = None
    cur = None
    try:
        # Connect to the database
        db = get_db_connection()
        cur = db.cursor()

        # Delete patient record from the database
        query = "DELETE FROM patients WHERE P_id = %s"
        cur.execute(query, (p_id,))
        db.commit()

        return jsonify({'message': 'Patient record deleted successfully'}), 200

    except Exception as error:
        return jsonify({'error': str(error)}), 500

    finally:
        if cur:
            cur.close()
        if db:
            db.close()

if __name__ == '__main__':
    app.run(debug=True)
