from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)
CORS(app)

# Connect to MySQL Database
def get_db_connection():
    connection = None
    try:
        connection = mysql.connector.connect(
<<<<<<< HEAD
            host='localhost',  # Replace with your host
            user='root',  # Replace with your MySQL username
            password='Nibhin@137',  # Replace with your MySQL password
            database='hospital'  # Replace with your database name
=======
            host='localhost',
            database='micro_project',  # Replace with your DB name
            user='root',  # Replace with your MySQL username
            password='mysql123'  # Replace with your MySQL password
>>>>>>> ac572aa7f51ab17beb358ee39e9a2c33d16d92c9
        )
    except Error as e:
        print(f"Error connecting to MySQL database: {e}")
    return connection

@app.route('/update_doctors', methods=['PUT'])
def update_doctors():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    try:
        # Get the JSON data from the request
        data = request.json
        doctor_id = data.get('doctorID')  # Changed from patientID to doctorID
        update_field = data.get('updateField')
        new_value = data.get('newValue')

        if not doctor_id or not update_field or not new_value:
            return jsonify({'error': 'Missing data: doctorID, updateField, and newValue are required'}), 400

        # Validate update_field against allowed fields
        allowed_fields = [
            'Dr_name',
            'Age',
            'Gender',
            'Specialization',
            'Salary',
            'fees',
            'Username',
            'Ph_No',
            'Working_Hrs',
            'Park_id',
        ]

        if update_field not in allowed_fields:
            return jsonify({'error': 'Invalid field specified for update'}), 400

        # Construct the SQL query
        query = f"UPDATE Doctors SET {update_field} = %s WHERE Dr_id = %s"
        cursor.execute(query, (new_value, doctor_id))
        connection.commit()
        
        # Check if any rows were affected
        if cursor.rowcount == 0:
            return jsonify({'error': 'Doctor not found'}), 404

        return jsonify({'message': 'Doctor information updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        connection.close()

@app.route('/get_all_doctors', methods=['GET'])
def get_all_doctors():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Fetch all doctors
        cursor.execute("SELECT * FROM Doctors")
        docs = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify(docs), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
