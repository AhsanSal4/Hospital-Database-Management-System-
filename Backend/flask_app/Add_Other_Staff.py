from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector as myc
import random
from datetime import datetime

app = Flask(__name__)
CORS(app, resources={r"/add_other_staff": {"origins": "http://localhost:5173"}})


@app.route('/otherstaffregister', methods=['POST', 'OPTIONS'])  # Handle OPTIONS method
def add_new_other_staff():
    if request.method == 'OPTIONS':
        # CORS preflight request
        response = app.make_default_options_response()
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
        response.headers.update(headers)
        return response

    try:
        # Connect to the database
        db = myc.connect(host='localhost', user='root', port='3306', passwd='mysql123', database='micro_project')
        cur = db.cursor()

        # Extract data from request body
        data = request.json
        staff_name = data.get('name')
        phone_number = data.get('phonenumber')
        designation = data.get('designation')
        gender = data.get('gender')
        age = data.get('age')
        username = data.get('username')
        password = data.get('pwd')

        staff_id = generate_staff_id()

        # Generate random park_id if not provided (optional)
        park_id = generate_park_id()
        cur.execute("INSERT INTO Parking (park_id, owner) VALUES (%s, %s)", (park_id, staff_name))

        # Insert login credentials into the login table
        cur.execute("INSERT INTO login (username, pwd, role, last_login) VALUES (%s, %s, %s, %s)", 
                    (username,password ,designation,datetime.now()))  # You can change 'default_password' as needed

        # Insert other staff details into the OtherStaff table
        cur.execute("""
        INSERT INTO other_staffs (s_id, s_name, ph_no, designation, gender, age, username, park_id)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """, (staff_id, staff_name, phone_number, designation, gender, age, username, park_id))

        db.commit()
        return jsonify({
            'message': 'Staff registered successfully',
            'staff_id': staff_id,
            'park_id': park_id
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        cur.close()
        db.close()

def generate_park_id():
    return random.choice('ABCDEFGHIJKLMNOPQRSTUVWXYZ') + ''.join(random.choices('0123456789', k=3))

def generate_staff_id():
    return random.choice('ABCDEFGHIJKLMNOPQRSTUVWXYZ') + ''.join(random.choices('0123456789', k=3))

if __name__ == '__main__':
    app.run(debug=True)
