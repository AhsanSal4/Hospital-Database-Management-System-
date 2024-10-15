from flask import Flask, request, jsonify
import mysql.connector as myc
import random

app = Flask(__name__)

# Function to add new receptionist (Flask version)
@app.route('/add_receptionist', methods=['POST'])
def add_receptionist():
    try:
        # Connect to the database
        db = myc.connect(host='localhost', user='root', port='3306', passwd='mysql123', database='micro_project')
        cur = db.cursor()

        # Helper functions to pad or format strings
        def gender_(gender):
            return gender.ljust(6)  # Pad gender to 6 characters if needed

        def r_name(name):
            return name.ljust(20)  # Pad receptionist name to 20 characters

        # Get data from the request (assuming JSON input)
        data = request.json
        r_name_input = data.get('receptionist_name')
        gender_input = data.get('gender')
        age = data.get('age')
        salary = data.get('salary')
        password = data.get('password')
        work_hours = data.get('work_hours')

        # Call helper functions to adjust the data
        r_name_formatted = r_name(r_name_input)
        gender_formatted = gender_(gender_input)

        # Generate a random receptionist ID
        r_id = (
            random.choice('ABCDEFCGHIJKLMNOPQRSTUVWXYZ') +
            ''.join(random.choices('1234567890', k=2))
        )

        # Insert query for receptionist details
        query = """
        INSERT INTO Receptionist (r_id, r_name, age, salary, working_hrs, pwd, gender)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        values = (r_id, r_name_formatted, age, salary, work_hours, password, gender_formatted)

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
