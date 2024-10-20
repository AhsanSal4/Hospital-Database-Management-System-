from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector  # Import your database connector
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Database connection
def get_db_connection():
    conn = mysql.connector.connect(
            host='localhost',
            database='hospital',  # Replace with your DB name
            user='root',  # Replace with your MySQL username
            password='Nibhin@137' # Replace with your MySQL password
        )
    return conn

@app.route('/login_adm', methods=['POST'])
def loginad():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query1 = "UPDATE login SET Last_login = %s WHERE username = %s"
    cursor.execute(query1, (datetime.now(), username))
    conn.commit()  # Commit the transaction

    # Query to check credentials
    query = "SELECT * FROM login WHERE username = %s AND pwd = %s AND role = %s"
    cursor.execute(query, (username, password,'ADMIN'))
    user = cursor.fetchone()
    
    cursor.close()
    conn.close()

    if user:
        # Credentials are correct
        return jsonify({"success": True, "message": "Login successful"})
    else:
        # Credentials are incorrect
        return jsonify({"success": False, "message": "Invalid username or password"}), 401

if __name__ == '__main__':
    app.run(debug=True)
