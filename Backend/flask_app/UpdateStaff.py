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

@app.route('/update_otherstaff', methods=['PUT'])
def update_otherstaff():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    try:
        # Get the JSON data from the request
        data = request.json
        staffID = data.get('staffID')
        updateField = data.get('updateField')
        newValue = data.get('newValue')

        if not staffID or not updateField or not newValue:
            return jsonify({'error': 'Missing data: staffID, updateField, and newValue are required'}), 400

        # Prevent SQL injection by using parameterized queries
        query = f"UPDATE other_staffs SET {updateField} = %s WHERE S_id = %s"
        cursor.execute(query, (newValue, staffID))
        connection.commit()
        cursor.close()
        connection.close()

        return jsonify({'message': 'Staff information updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
