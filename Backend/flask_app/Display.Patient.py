from flask import Flask, jsonify, request
import mysql.connector as myc

app = Flask(__name__)

# Route to display patient details based on P_code
@app.route('/patients/pcode', methods=['GET'])
def get_patient_by_pcode():
    p_code = request.args.get('P_code')  # Retrieve P_code from query parameters
    if not p_code:
        return jsonify({'error': 'P_code is required'}), 400

    try:
        # Connect to the database
        db = myc.connect(host='localhost', user='root', port='3306', passwd='mysql123', database='micro_project')
        cur = db.cursor()

        # Query to fetch patient details by P_code
        query = "SELECT P_Code, Patient_Name, Mobile_No, Gender, Age, Height_cm_, Weight_Kg_, Dt_admit, Disease, Med_Prescribed, dr_id FROM Patient WHERE P_Code=%s"
        cur.execute(query, (p_code,))
        patient = cur.fetchall()

        if not patient:
            return jsonify({'message': 'No patient found with this P_code'}), 404

        # Format the response
        response = []
        for x in patient:
            patient_info = {
                'P_Code': x[0],
                'Patient_Name': x[1],
                'Mobile_No': x[2],
                'Gender': x[3],
                'Age': x[4],
                'Height_cm_': x[5],
                'Weight_Kg_': x[6],
                'Dt_admit': x[7],
                'Disease': x[8],
                'Med_Prescribed': x[9],
                'Dr_id': x[10]
            }
            response.append(patient_info)

        return jsonify({'patient': response}), 200

    except Exception as error:
        return jsonify({'error': str(error)}), 500

    finally:
        cur.close()
        db.close()


# Route to display patient details based on Mobile_No
@app.route('/patients/mobile', methods=['GET'])
def get_patient_by_mobile():
    mobile_no = request.args.get('Mobile_No')  # Retrieve Mobile_No from query parameters
    if not mobile_no:
        return jsonify({'error': 'Mobile_No is required'}), 400

    try:
        # Connect to the database
        db = myc.connect(host='localhost', user='root', port='3306', passwd='mysql123', database='micro_project')
        cur = db.cursor()

        # Query to fetch patient details by Mobile_No
        query = "SELECT P_Code, Patient_Name, Mobile_No, Gender, Age, Height_cm_, Weight_Kg_, Dt_admit, Disease, Med_Prescribed, dr_id FROM Patient WHERE Mobile_No=%s"
        cur.execute(query, (mobile_no,))
        patient = cur.fetchall()

        if not patient:
            return jsonify({'message': 'No patient found with this Mobile_No'}), 404

        # Format the response
        response = []
        for x in patient:
            patient_info = {
                'P_Code': x[0],
                'Patient_Name': x[1],
                'Mobile_No': x[2],
                'Gender': x[3],
                'Age': x[4],
                'Height_cm_': x[5],
                'Weight_Kg_': x[6],
                'Dt_admit': x[7],
                'Disease': x[8],
                'Med_Prescribed': x[9],
                'Dr_id': x[10]
            }
            response.append(patient_info)

        return jsonify({'patient': response}), 200

    except Exception as error:
        return jsonify({'error': str(error)}), 500

    finally:
        cur.close()
        db.close()


# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
