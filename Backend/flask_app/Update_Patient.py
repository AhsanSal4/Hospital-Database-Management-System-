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
            host='localhost',
            database='micro_project',  # Replace with your DB name
            user='root',  # Replace with your MySQL username
            password='mysql123'  # Replace with your MySQL password
        )
    except Error as e:
        print(f"Error connecting to MySQL database: {e}")
    return connection

@app.route('/update_patient', methods=['PUT'])
def update_patient():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    try:
        # Get the JSON data from the request
        data = request.json
        patient_id = data.get('patientID')
        update_field = data.get('updateField')
        new_value = data.get('newValue')

        # Validate the data
        if not patient_id or not update_field or not new_value:
            return jsonify({'error': 'Missing data: patientID, updateField, and newValue are required'}), 400

        # Connect to the database
       
        # Create the SQL query to update the patient information
        query = f"UPDATE Patients SET {update_field} = %s WHERE P_id = %s"
        cursor.execute(query, (new_value, patient_id))

        # Commit the changes
        connection.commit()

        # Close the database connection
        cursor.close()
        connection.close()

        return jsonify({'message': 'Patient information updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/get_all_patients', methods=['GET'])
def get_all_patients():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Fetch all patients
        cursor.execute("SELECT * FROM Patient")
        patients = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify(patients), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
