from flask import Flask, jsonify, request
import mysql.connector as myc
import random

app = Flask(__name__)

def generate_doctor_id():
    a = random.choice('ABCDEFGHIJKLmnopqrstuvwxyz')
    b = random.choice('1234567890')
    c = random.choice('1234567890')
    d = random.choice('1234567890')
    return str(a) + str(b) + str(c) + str(d)

@app.route('/Hire_Doctor', methods=['POST'])
def hire_doctor():
    try:
        # Retrieve data from the request body
        data = request.get_json()
        Doctor_Name = data.get('fullName')  # Match the name field from frontend
        Gender = data.get('gender')
        Specialisation = data.get('specialisation')
        Age = data.get('age')
        Salary = data.get('salary')
        Fees = data.get('fees')
        Passwd = data.get('password')

        # Validate input data
        if not all([Doctor_Name, Gender, Specialisation, Age, Salary, Fees, Passwd]):
            return jsonify({'error': 'All fields are required'}), 400

        if len(Passwd) != 5:
            return jsonify({'error': 'Password must be 5 characters long'}), 400

        # Connect to the database
        db = myc.connect(host='localhost', user='root', port='3306', passwd='mysql123', database='micro_project')
        cur = db.cursor()

        # Generate a doctor ID
        dr_id = generate_doctor_id()

        # Insert into the database
        query = "INSERT INTO Doctor VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
        values = (dr_id, Doctor_Name, Gender, Specialisation, Age, Salary, Fees, Passwd)
        cur.execute(query, values)
        db.commit()

        response = {
            'message': 'Doctor record inserted',
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

if __name__ == '__main__':
    app.run(debug=True)
