from flask import Flask, request, jsonify
import mysql.connector
from mysql.connector import Error
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

def create_db_connection():
    """Create a database connection."""
    try:
        connection = mysql.connector.connect(
            host='localhost',
            database='micro_project',  # Replace with your DB name
            user='root',  # Replace with your MySQL username
            password='mysql123'  # Replace with your MySQL password
        )
        if connection.is_connected():
            return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None

@app.route('/register_other_staff', methods=['POST'])
def register_other_staff():
    data = request.get_json()

    # Validate input data
    required_fields = ['id', 'name', 'phonenumber', 'designation', 'gender', 'age', 'username', 'parkid', 'pwd', 'last_login']
    if any(field not in data for field in required_fields):
        return jsonify({'message': 'Missing required fields'}), 400

    connection = create_db_connection()
    if connection is None:
        return jsonify({'message': 'Failed to connect to the database.'}), 500

    try:
        cursor = connection.cursor()

        # Check if Park_id already exists in the parking table
        cursor.execute('SELECT * FROM parking WHERE Park_id = %s', (data['parkid'],))
        park_exists = cursor.fetchone()

        # If Park_id does not exist, insert into parking table
        if not park_exists:
            cursor.execute(''' 
                INSERT INTO parking (Park_id, Owner) 
                VALUES (%s, %s)
            ''', (data['parkid'], data['name']))

        # Insert data into the login table
        cursor.execute(''' 
            INSERT INTO login (Username, Pwd, role, Last_Login) 
            VALUES (%s, %s, %s, %s)
        ''', (data['username'], data['pwd'], data['designation'], datetime.now()))

        # Insert data into the Other_staffs table
        cursor.execute(''' 
            INSERT INTO Other_staffs (S_id, S_name, Ph_No, Designation, Gender, Age, Username, Park_id)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        ''', (data['id'], data['name'], data['phonenumber'], data['designation'],
              data['gender'], data['age'], data['username'], data['parkid']))

        connection.commit()
        cursor.close()
        return jsonify({'message': 'Staff member registered successfully!'}), 201

    except Error as e:
        print(f"Error occurred: {e}")
        return jsonify({'message': 'Failed to register staff member.'}), 500

    finally:
        if connection.is_connected():
            connection.close()

if __name__ == '__main__':
    app.run(debug=True)
