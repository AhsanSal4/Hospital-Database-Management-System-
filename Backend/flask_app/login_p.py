from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Database connection
def get_db_connection():
    conn = mysql.connector.connect(
        host='localhost',
<<<<<<< HEAD
        user='root',  # Replace with your DB user
        password='Nibhin@137',  # Replace with your DB password
        database='hospital'  # Replace with your DB name
=======
        database='micro_project',  # Replace with your DB name
        user='root',  # Replace with your MySQL username
        password='mysql123'  # Replace with your MySQL password
>>>>>>> ac572aa7f51ab17beb358ee39e9a2c33d16d92c9
    )
    return conn

@app.route('/login_pa', methods=['POST'])
def loginp():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        # Update the last login time
        query1 = "UPDATE login SET Last_login = %s WHERE username = %s"
        cursor.execute(query1, (datetime.now(), username))
        conn.commit()  # Commit the transaction

        # Query to check credentials
        query = "SELECT * FROM login WHERE username = %s AND pwd = %s AND role = %s"
        cursor.execute(query, (username, password, 'PATIENT'))

        user = cursor.fetchone()
        
        if user:
            return jsonify({"success": True, "message": "Login successful"})
        else:
            return jsonify({"success": False, "message": "Invalid username or password"}), 401
    except Exception as e:
        print(f"Error updating last login or validating user: {e}")
        return jsonify({"success": False, "message": "Server error"}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/login_do', methods=['POST'])
def logind():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        # Update the last login time
        query1 = "UPDATE login SET Last_login = %s WHERE username = %s"
        cursor.execute(query1, (datetime.now(), username))
        conn.commit()  # Commit the transaction

        # Query to check credentials
        query = "SELECT * FROM login WHERE username = %s AND pwd = %s AND role = %s"
        cursor.execute(query, (username, password, 'DOCTOR'))

        user = cursor.fetchone()

        if user:
            return jsonify({"success": True, "message": "Login successful"})
        else:
            return jsonify({"success": False, "message": "Invalid username or password"}), 401
    except Exception as e:
        print(f"Error updating last login or validating user: {e}")
        return jsonify({"success": False, "message": "Server error"}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/login_re', methods=['POST'])
def loginr():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        # Update the last login time
        query1 = "UPDATE login SET Last_login = %s WHERE username = %s"
        cursor.execute(query1, (datetime.now(), username))
        conn.commit()  # Commit the transaction

        # Query to check credentials
        query = "SELECT * FROM login WHERE username = %s AND pwd = %s AND role = %s"
        cursor.execute(query, (username, password, 'RECEPTIONIST'))

        user = cursor.fetchone()

        if user:
            return jsonify({"success": True, "message": "Login successful"})
        else:
            return jsonify({"success": False, "message": "Invalid username or password"}), 401
    except Exception as e:
        print(f"Error updating last login or validating user: {e}")
        return jsonify({"success": False, "message": "Server error"}), 500
    finally:
        cursor.close()
        conn.close()

if __name__ == '__main__':
    app.run(debug=True)
