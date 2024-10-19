from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)
CORS(app)

# MySQL Database connection
def create_db_connection():
    try:
        connection = mysql.connector.connect(
            host='localhost',
<<<<<<< HEAD
            database='hospital',  # Replace with your DB name
            user='root',  # Replace with your MySQL username
            password='Nibhin@137'  # Replace with your MySQL password
=======
            database='micro_project',  # Replace with your DB name
            user='root',  # Replace with your MySQL username
            password='mysql123'  # Replace with your MySQL password
>>>>>>> ac572aa7f51ab17beb358ee39e9a2c33d16d92c9
        )
        if connection.is_connected():
            return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None

@app.route('/')
def welcome():
    return """
    <h1>Welcome to Hospital Management System</h1>
    <p>Use /admin for admin functionalities, /user for user functionalities, /exit to exit.</p>
    """

# Get patient details by patient_id
@app.route('/get_patient/<patient_id>', methods=['GET'])
def get_patient(patient_id):
    connection = create_db_connection()
    if connection is None:
        return jsonify({'error': 'Database connection error'}), 500

    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT P_name FROM patients WHERE P_id = %s", (patient_id,))
    patient = cursor.fetchone()

    cursor.close()
    connection.close()

    if patient:
        return jsonify(patient)
    else:
        return jsonify({'error': 'Patient not found'}), 404

# Delete patient by patient_id
# Delete patient by patient_id
@app.route('/delete_patient/<patient_id>', methods=['DELETE'])
def delete_patient(patient_id):
    connection = create_db_connection()
    if connection is None:
        return jsonify({'error': 'Database connection error'}), 500

    cursor = connection.cursor()

    # The tuple must have a trailing comma to ensure it's interpreted correctly
    cursor.execute("DELETE FROM patients WHERE P_id = %s", (patient_id,))  # Add a trailing comma

    connection.commit()

    rowcount = cursor.rowcount  # Capture row count before closing the cursor
    cursor.close()
    connection.close()

    if rowcount > 0:
        return jsonify({'message': 'Patient deleted successfully'})
    else:
        return jsonify({'error': 'Patient not found'}), 404

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
