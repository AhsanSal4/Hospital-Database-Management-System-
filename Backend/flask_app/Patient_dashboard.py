from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Database connection
def get_db_connection():
    conn = mysql.connector.connect(
            host='localhost',
            database='micro_project',  # Replace with your DB name
            user='root',  # Replace with your MySQL username
            password='mysql123'  # Replace with your MySQL password
        )
    return conn

# Fetch Patient Dashboard Data
@app.route('/patient_dashboard', methods=['POST'])
def patient_dashboard():
    data = request.json
    print(f"Received request body: {data}")  # Print the entire request body
    
    username = data.get('username')
    print(f"Extracted username: {username}")  # Print the extracted username

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        # Fetch patient details using username
        query = """
        SELECT p.P_id, p.P_name, p.Age, p.Gender, p.Ph_No, p.Disease, p.Med_prescribed, p.Dr_id, d.Dr_name, p.Bill, p.Patient_Reports
        FROM patients p
        LEFT JOIN doctors d ON p.Dr_id = d.Dr_id
        WHERE p.Username = %s
        """
        cursor.execute(query, (username,))
        patient = cursor.fetchone()

        # If patient is found, structure the response
        if patient:
            response = {
                "success": True,
                "patientID": patient['P_id'],
                "fullName": patient['P_name'],
                "age": patient['Age'],
                "gender": patient['Gender'],
                "contactNumber": str(patient['Ph_No']),
                "pastDiseases": patient['Disease'] or "No past diseases recorded",
                "prescribedMedicines": patient['Med_prescribed'] or "No medicines prescribed",
                "attendingDoctor": patient['Dr_name'] or "Not assigned",
                "bills": {
                    "currentBills": f"₹{patient['Bill']:.2f}",
                },
                "medicalReports": patient['Patient_Reports'] or "No reports available",
            }
            return jsonify(response), 200

        # If no patient is found, return an error response
        return jsonify({"success": False, "message": "Patient not found"}), 404

    except Exception as e:
        print(f"Error fetching patient details: {e}")
        return jsonify({"success": False, "message": "Server error"}), 500

    finally:
        cursor.close()
        conn.close()

if __name__ == '__main__':
    app.run(debug=True)
