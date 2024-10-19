from flask import Flask, jsonify, request
import mysql.connector
import random
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Function to connect to the database
def get_db_connection():
    conn = mysql.connector.connect(
        host='localhost',
        user='root',
        password='Nibhin@137',
        database='hospital'
    )
    return conn

# Function to generate a unique doctor ID
def generate_doctor_id():
    return random.choice('ABCDEFGHIJKLmnopqrstuvwxyz') + ''.join(random.choices('1234567890', k=3))

@app.route('/admin/hire_doctor', methods=['POST'])
def hire_doctor():
    try:
        # Retrieve data from the request body
        data = request.get_json()
        Doctor_Name = data.get('fullName')  # Match the name field from frontend
        Gender = data.get('gender')
        Specialisation = data.get('specialisation')
        Age = data.get('age')
        Salary = data.get('salary')
        Fees = data.get('fees')
        Passwd = data.get('password')

        # Validate input data
        if not all([Doctor_Name, Gender, Specialisation, Age, Salary, Fees, Passwd]):
            return jsonify({'error': 'All fields are required'}), 400

        if len(Passwd) != 5:
            return jsonify({'error': 'Password must be 5 characters long'}), 400

        # Connect to the database
        db = get_db_connection()
        cur = db.cursor()

        # Generate a doctor ID
        dr_id = generate_doctor_id()

        # Insert doctor record into the database
        query = "INSERT INTO Doctor (dr_id, Doctor_Name, Gender, Specialisation, Age, Salary, Fees, Passwd) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
        values = (dr_id, Doctor_Name, Gender, Specialisation, Age, Salary, Fees, Passwd)
        cur.execute(query, values)
        db.commit()

        response = {
            'message': 'Doctor record inserted successfully',
            'dr_id': dr_id
        }
        return jsonify(response), 201

    except Exception as error:
        return jsonify({'error': str(error)}), 500

    finally:
        # Safely close the cursor and the connection
        if cur:
            cur.close()
        if db:
            db.close()

if __name__ == '__main__':
    app.run(debug=True)
