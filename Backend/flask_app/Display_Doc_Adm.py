from flask import Flask, jsonify
import mysql.connector as myc

app = Flask(__name__)

# Route to display all doctors
@app.route('/doctors', methods=['GET'])
def display_all_doctors():
    try:
        # Connect to the database
        db = myc.connect(host='localhost', user='root', port='3306', passwd='mysql123', database='micro_project')
        cur = db.cursor()

        # Query to fetch all doctor data
        query = "SELECT * FROM Doctor"
        cur.execute(query)
        doctors = cur.fetchall()

        # Column names for clarity in response
        column_names = ['Dr_id', 'Dr_Name', 'Gender', 'Specialization', 'Age', 'Salary', 'Fees', 'Password']

        # Format fetched doctor data into a list of dictionaries
        doctor_list = [dict(zip(column_names, doctor)) for doctor in doctors]

        # Return the result as JSON
        return jsonify({'doctors': doctor_list}), 200

    except Exception as error:
        # Return an error response in case of an exception
        return jsonify({'error': str(error)}), 500

    finally:
        # Close cursor and connection
        cur.close()
        db.close()

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
