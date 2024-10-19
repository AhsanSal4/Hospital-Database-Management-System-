from flask import Flask, jsonify, request
import mysql.connector as myc

app = Flask(__name__)

# Route to display all patients under a specific doctor
@app.route('/patients/doctor/<dr_id>', methods=['GET'])
def display_patients_by_doctor(dr_id):
    try:
        # Connect to the database
        db = myc.connect(host='localhost', user='root', port='3306', passwd='mysql123', database='micro_project')
        cur = db.cursor()

        # Query to get all patients under the given doctor ID
        query = "SELECT * FROM Patient WHERE dr_id = %s"
        cur.execute(query, (dr_id,))
        patients = cur.fetchall()

        # Define the response structure
        response = []
        for patient in patients:
            patient_info = {
                'P_Code': patient[0],
                'Patient_Name': patient[1],
                'Mobile_No': patient[2],
                'Gender': patient[3],
                'Age': patient[4],
                'Height': patient[5],
                'Weight': patient[6],
                'Date': patient[7],
                'Symptom': patient[8],
                'Med_Prescribed': patient[9],
                'Dr_id': patient[10]
            }
            response.append(patient_info)

        # Return the result as JSON
        return jsonify({'patients': response}), 200

    except Exception as error:
        # Return an error response in case of an exception
        return jsonify({'error': str(error)}), 500

    finally:
        # Close cursor and connection
        cur.close()
        db.close()

# Route to display a particular patient under a specific doctor
@app.route('/patient/<dr_id>/<p_code>', methods=['GET'])
def display_patient(dr_id, p_code):
    try:
        # Connect to the database
        db = myc.connect(host='localhost', user='root', port='3306', passwd='mysql123', database='micro_project')
        cur = db.cursor()

        # Query to get a particular patient under the given doctor ID
        query = "SELECT * FROM Patient WHERE dr_id = %s AND P_code = %s"
        cur.execute(query, (dr_id, p_code))
        patient = cur.fetchall()

        if not patient:
            return jsonify({'message': 'Patient not found'}), 404

        # Define the response structure
        patient_info = {
            'P_Code': patient[0][0],
            'Patient_Name': patient[0][1],
            'Mobile_No': patient[0][2],
            'Gender': patient[0][3],
            'Age': patient[0][4],
            'Height': patient[0][5],
            'Weight': patient[0][6],
            'Date': patient[0][7],
            'Symptom': patient[0][8],
            'Med_Prescribed': patient[0][9],
            'Dr_id': patient[0][10]
        }

        # Return the result as JSON
        return jsonify({'patient': patient_info}), 200

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
