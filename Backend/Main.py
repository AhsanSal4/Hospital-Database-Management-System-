from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_app import (
    Hire_Doctor,
    Add_Med_Prescribed,
    Add_newPatient,
    Display_allPatient,
    Display_Doc_Adm ,
    Display_Doc_U,
    Display_Patient,
    Add_Receptionist,
    Delete_Receptionist,
    Display_Receptionist,
    Display_Pat_Doctor,
    Display_Medicine,
    Display_Med_Pa_,
    Add_Medicine,
    Bill,
    login_p,
    Add_Other_Staff
)


app = Flask(__name__)
CORS(app)

@app.route('/')
def welcome():
    return """
    <h1>Welcome to Hospital Management System</h1>
    <p>Use /admin for admin functionalities, /user for user functionalities, /exit to exit.</p>
    """

@app.route('/admin', methods=['POST'])
def admin_mode():
    password = request.json.get('password')
    if password == '12ANYY3456':
        return jsonify({
            "message": "Welcome to Admin Mode",
            "actions": [
                "Manage Doctor Details",
                "Manage Patient Details",
                "Manage Receptionist Details",
                "Manage Medicine Details",
                "Generate Bill",
                "Exit Admin Mode"
            ]
        }), 200
    return jsonify({"error": "Invalid password"}), 403

@app.route('/Hire_Doctor', methods=['POST'])
def hire_doctor():
    return Hire_Doctor.hire()

@app.route('/add_patient', methods=['POST'])
def add_newPatient():
    return Add_newPatient.add_new_patient()

@app.route('/Add_Recept', methods=['POST'])
def add_receptionist():
    return Add_Receptionist.add_reception()

@app.route('/login_pa', methods=['POST'])
def Login_pa():
    return login_p.loginp()

@app.route('/otherstaffregister', methods=['POST'])
def add_newStaff():
    return Add_Other_Staff.add_new_other_staff()

@app.route('/user', methods=['GET'])
def user_mode():
    return jsonify({
        "message": "Welcome to User Mode",
        "actions": [
            "Receptionist Mode",
            "Doctor Mode",
            "Pharmacist Mode",
            "Exit User Mode"
        ]
    }), 200

@app.route('/user/receptionist', methods=['GET'])
def receptionist_mode():
    return jsonify({
        "actions": [
            "Display All Doctors",
            "Display Particular Patient Detail",
            "Add a Patient",
            "Exit Receptionist Mode"
        ]
    }), 200

@app.route('/user/doctor', methods=['GET'])
def doctor_mode():
    return jsonify({
        "actions": [
            "Add Medicine Prescribed by the Doctor",
            "Display List of Patients and Particular Patient",
            "Display Medicines",
            "Exit Doctor Mode"
        ]
    }), 200

@app.route('/user/pharmacist', methods=['GET'])
def pharmacist_mode():
    return jsonify({
        "actions": [
            "Add Medicine",
            "Display Medicine",
            "Generate Bill",
            "Exit Pharmacist Mode"
        ]
    }), 200

@app.route('/exit', methods=['GET'])
def exit_system():
    return jsonify({
        "message": "Thank You For Your Time. Visit Again! 😊"
    }), 200

# Error handling for invalid routes
@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "Not found"}), 404

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
