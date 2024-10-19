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
            host='localhost',  # Replace with your host
            user='root',  # Replace with your MySQL username
            password='Nibhin@137',  # Replace with your MySQL password
            database='hospital'  # Replace with your database name
        )
    except Error as e:
        print(f"Error connecting to MySQL database: {e}")
    return connection

@app.route('/update_receptionists', methods=['PUT'])
def update_receptionists():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    try:
        # Get the JSON data from the request
        data = request.json
        rec_id = data.get('patientID')  # This should be 'receptionistID' to match the React code
        update_field = data.get('updateField')
        new_value = data.get('newValue')

        if not rec_id or not update_field or not new_value:
            return jsonify({'error': 'Missing data: patientID, updateField, and newValue are required'}), 400

        # Construct the SQL query
        query = f"UPDATE Receptionists SET {update_field} = %s WHERE R_id = %s"
        cursor.execute(query, (new_value, rec_id))
        connection.commit()
        
        # Check if any rows were affected
        if cursor.rowcount == 0:
            return jsonify({'error': 'Receptionist not found'}), 404

        return jsonify({'message': 'Receptionists information updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        connection.close()

@app.route('/get_all_receptionists', methods=['GET'])
def get_all_receptionists():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Fetch all receptionists
        cursor.execute("SELECT * FROM Receptionists")
        rec = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify(rec), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
