from flask import Flask, jsonify, request
import mysql.connector as myc
import random

app = Flask(__name__)

def generate_doctor_id():
    # Generate a random doctor ID
    a = random.choice('ABCDEFGHIJKLmnopqrstuvwxyz')
    b = random.choice('1234567890')
    c = random.choice('1234567890')
    d = random.choice('1234567890')
    return str(a) + str(b) + str(c) + str(d)

@app.route('/hire_doctor', methods=['POST'])
def hire_doctor():
    try:
        # Retrieve data from the request body
        data = request.get_json()
        Doctor_Name = data.get('Doctor_Name')
        Gender = data.get('Gender')
        Specialisation = data.get('Specialisation')
        Age = data.get('Age')
        Salary = data.get('Salary')
        Fees = data.get('Fees')
        Passwd = data.get('Password')

        # Validate input data
        if not all([Doctor_Name, Gender, Specialisation, Age, Salary, Fees, Passwd]):
            return jsonify({'error': 'All fields are required'}), 400
        if len(Passwd) != 5:
            return jsonify({'error': 'Password must be 5 characters long'}), 400

        # Connect to the database
        db = myc.connect(host='localhost', user='root', port='3306', passwd='mysql123', database='micro_project')
        cur = db.cursor()

        # Format fields to ensure consistent length
        def format_field(field, length=20):
            return field.ljust(length)[:length]  # Left justify and truncate to length

        D = format_field(Doctor_Name)
        G = format_field(Gender)
        S = format_field(Specialisation)

        dr_id = generate_doctor_id()

        # Insert into the database
        query = "INSERT INTO Doctor VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
        values = (dr_id, D, G, S, Age, Salary, Fees, Passwd)
        cur.execute(query, values)
        db.commit()

        response = {
            'message': 'Record(s) inserted',
            'dr_id': dr_id
        }
        return jsonify(response), 201

    except Exception as error:
        return jsonify({'error': str(error)}), 500

    finally:
        if cur:
            cur.close()
        if db:
            db.close()

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
