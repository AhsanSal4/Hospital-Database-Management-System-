from flask import Flask, jsonify
import mysql.connector
from mysql.connector import Error
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from your React app

# MySQL database connection configuration
def get_db_connection():
    try:
        connection = mysql.connector.connect(
            host='localhost',  # Replace with your host
            user='root',  # Replace with your MySQL username
            password='Nibhin@137',  # Replace with your MySQL password
            database='hospital'  # Replace with your database name
        )
        return connection
    except Error as e:
        print(f"Error connecting to MySQL database: {e}")
        return None

@app.route('/get_all_staffs', methods=['GET'])
def get_all_staffs():
    connection = get_db_connection()
    if connection is None:
        return jsonify({"error": "Database connection failed"}), 500
    
    cursor = connection.cursor(dictionary=True)

    try:
        cursor.execute("SELECT * FROM other_staffs")  # Adjust this query to your table structure
        staffs = cursor.fetchall()
        return jsonify(staffs), 200
    except Error as e:
        print(f"Error reading data from MySQL table: {e}")
        return jsonify({"error": "Unable to fetch data"}), 500
    finally:
        cursor.close()
        connection.close()

if __name__ == '__main__':
    app.run(debug=True)
