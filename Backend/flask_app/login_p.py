from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector  # Import your database connector

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Database connection
def get_db_connection():
    conn = mysql.connector.connect(
        host='localhost',
        user='root',  # Replace with your DB user
        password='Nibhin@137',  # Replace with your DB password
        database='hospital'  # Replace with your DB name
    )
    return conn

@app.route('/login_pa', methods=['POST'])
def loginp():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    # Query to check credentials
    query = "SELECT * FROM login WHERE username = %s AND pwd = %s"
    cursor.execute(query, (username, password))
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
