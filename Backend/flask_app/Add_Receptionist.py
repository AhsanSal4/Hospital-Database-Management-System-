from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector as myc
import random
from datetime import datetime  # Import datetime to get the current date

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# Function to add new receptionist (Flask version)
@app.route('/Add_Recept', methods=['POST'])
def add_reception():
    try:
        # Connect to the database
        db = myc.connect(host='localhost', user='root', port='3306', passwd='Nibhin@137', database='hospital')
        cur = db.cursor()

        # Helper functions to pad or format strings
        def gender_(gender):
            return gender.ljust(6)  # Pad gender to 6 characters if needed

        def r_name(name):
            return name.ljust(20)  # Pad receptionist name to 20 characters

        # Get data from the request (assuming JSON input)
        data = request.json
        r_name_input = data.get('fullName')
        gender_input = data.get('gender')
        mobile_no = data.get('mobile_no')
        age = data.get('age')
        salary = data.get('salary')
        password = data.get('password')
        work_hours = data.get('working_hrs')
        username = data.get('username')  # Get username from request

        # Call helper functions to adjust the data
        r_name_formatted = r_name(r_name_input)
        gender_formatted = gender_(gender_input)

        # Generate a random receptionist ID
        r_id = (
            random.choice('ABCDEFCGHIJKLMNOPQRSTUVWXYZ') +
            ''.join(random.choices('1234567890', k=2))
        )

        # Generate a random park ID
        park_id = (
            random.choice('ABCDEFCGHIJKLMNOPQRSTUVWXYZ') +
            ''.join(random.choices('1234567890', k=3))
        )

        # Get the current date for last_login
        last_login_date = datetime.now().strftime('%Y-%m-%d')  # Format date as 'YYYY-MM-DD'

        # Insert into Parking table first
        park_query = """
        INSERT INTO Parking (park_id, owner)
        VALUES (%s, %s)
        """
        park_values = (park_id,r_name_formatted )
        cur.execute(park_query, park_values)

        # Insert into Login table
        login_query = """
        INSERT INTO login (username, pwd, role, last_login)
        VALUES (%s, %s, %s, %s)
        """
        login_values = (username, password, 'RECEPTIONIST', last_login_date)  # Include last_login date
        cur.execute(login_query, login_values)

        # Insert query for receptionist details, including last_login
        query = """
        INSERT INTO Receptionists (r_id, r_name,ph_no, working_hrs, gender, age, salary,username,park_id)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        values = (r_id, r_name_formatted,mobile_no, work_hours, gender_formatted, age, salary, username, park_id)  # Include last_login date

        cur.execute(query, values)
        db.commit()

        # Return success response
        return jsonify({
            'message': f'{cur.rowcount} record(s) inserted',
            'r_id': r_id
        }), 200

    except Exception as error:
        # Return error response
        return jsonify({'error': str(error)}), 500

    finally:
        # Close cursor and connection
        cur.close()
        db.close()

# Run Flask app
if __name__ == '__main__':
    app.run(debug=True)
