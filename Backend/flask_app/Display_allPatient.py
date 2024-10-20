from flask import Flask, jsonify
import mysql.connector as myc

app = Flask(__name__)

# Route to display all patients
@app.route('/patients', methods=['GET'])
def display_all_patients():
    try:
        # Connect to the database
        db = myc.connect(host='localhost', user='root', port='3306', passwd='mysql123', database='micro_project')
        cur = db.cursor()

        # Query to fetch all patient data
        query = "SELECT * FROM Patient"
        cur.execute(query)
        patients = cur.fetchall()

        # Column names for clarity in response
        column_names = ['P_code', 'Patient_Name', 'Mobile_No', 'Gender', 'Age', 'Height', 'Weight', 'Date_Admit', 'Symptom', 'Med_Prescribed', 'Dr_id']

        # Format fetched patient data into a list of dictionaries
        patient_list = [dict(zip(column_names, patient)) for patient in patients]

        # Return the result as JSON
        return jsonify({'patients': patient_list}), 200

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
