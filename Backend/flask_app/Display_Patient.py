from flask import Flask, jsonify
import mysql.connector
from mysql.connector import Error
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # To allow cross-origin requests from your React app

# MySQL database connection configuration
def get_db_connection():
    connection = None
    try:
        connection = mysql.connector.connect(
            host='localhost',
            database='hospital',  # Replace with your DB name
            user='root',  # Replace with your MySQL username
            password='Nibhin@137'  # Replace with your MySQL password
        )
    except Error as e:
        print(f"Error connecting to MySQL database: {e}")
    return connection

# API endpoint to get all patients
@app.route('/get_all_patients', methods=['GET'])
def get_all_patients():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    try:
        cursor.execute("SELECT * FROM patients")  # Adjust this query to your table structure
        patients = cursor.fetchall()

        return jsonify(patients), 200
    except Error as e:
        print(f"Error reading data from MySQL table: {e}")
        return jsonify({"error": "Unable to fetch data"}), 500
    finally:
        cursor.close()
        connection.close()

if __name__ == '__main__':
    app.run(debug=True)
