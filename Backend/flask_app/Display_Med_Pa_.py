from flask import Flask, request, jsonify
import mysql.connector as myc

app = Flask(__name__)

# Route to display prescribed medicines for a specific patient
@app.route('/medicines/patient/<p_code>', methods=['GET'])
def display_medicines_for_patient(p_code):
    try:
        # Connect to the database
        db = myc.connect(host='localhost', user='root', port='3306', passwd='mysql123', database='micro_project')
        cur = db.cursor()

        # Query to get the prescribed medicine for the patient
        query = "SELECT Med_Prescribed FROM Patient WHERE P_code = %s"
        cur.execute(query, (p_code,))
        prescribed_medicine = cur.fetchone()

        if prescribed_medicine:
            med_name = prescribed_medicine[0]

            # Query to get medicine details based on the prescribed medicine name
            medicine_query = "SELECT M_code, Med_Name, Price, Symptom FROM Medicine WHERE Med_Name = %s"
            cur.execute(medicine_query, (med_name,))
            medicine_details = cur.fetchall()

            # Define the response structure
            response = []
            for medicine in medicine_details:
                medicine_info = {
                    'M_code': medicine[0],
                    'Med_Name': medicine[1],
                    'Price': medicine[2],
                    'Symptom': medicine[3]
                }
                response.append(medicine_info)

            # Return the result as JSON
            return jsonify({'medicines': response}), 200
        else:
            return jsonify({'message': 'No prescribed medicine found for this patient.'}), 404

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
