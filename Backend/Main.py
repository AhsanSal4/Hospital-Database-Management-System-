from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_app import (
    Hire_Doctor,
    Add_Med_Prescribed,
    Add_newPatient,
    Display_allPatient,
    Display_Doc_Adm,
    Display_Doc_U,
    Display_Patient,
    Add_Receptionist,
    Delete_Receptionist,
    Display_Receptionist,
    Display_Pat_Doctor,
    Display_Medicine,
    Display_Med_Pa_,
    Add_Medicine,
    login_p,
    login_adm,
    Display_OtherStaffs,
    Update_Patient,
    UpdateReceptionists,
    UpdateDoctor,
    UpdateStaff,
    Delete_Patient,
    Delete_Doctor,
    Delete_Otherstaffs,
    DeleteMed,
    Add_Other_Staff,
    UpdateMedicine,
    Patient_dashboard,
    Bill,
    Doctor_Dashboard
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
    return Hire_Doctor.hire_doctor()

@app.route('/add_patient', methods=['POST'])
def add_newPatient():
    return Add_newPatient.add_new_patient()

@app.route('/Add_Recept', methods=['POST'])
def add_receptionist():
    return Add_Receptionist.add_reception()

@app.route('/login_pa', methods=['POST'])
def Login_pa():
    return login_p.loginp()

@app.route('/login_do', methods=['POST'])
def Login_do():
    return login_p.logind()

@app.route('/login_adm', methods=['POST'])
def Login_Ad():
    return login_adm.loginad()

@app.route('/update_medicine', methods=['PUT'])
def up_med():
    return UpdateMedicine.update_medicine()

@app.route('/login_re', methods=['POST'])
def Login_re():
    return login_p.loginr()

@app.route('/get_all_patients', methods=['GET'])
def Get_all_patients():
    return Display_Patient.get_all_patients()

@app.route('/get_all_receptionists', methods=['GET'])
def Get_all_receptionists():
    return Display_Receptionist.get_all_receptionists()

@app.route('/display_all_doctors', methods=['GET'])
def Display_all_doctors():
    return Display_Doc_Adm.display_all_doctors()

@app.route('/get_all_staffs', methods=['GET'])
def Display_all_Staffs():
    return Display_OtherStaffs.get_all_staffs()

@app.route('/display_all_medicines', methods=['GET'])
def Display_all_medicines():
    return Display_Medicine.display_all_medicines()

@app.route('/update_patient', methods=['PUT'])
def Update_patients():
    return Update_Patient.update_patient()  # Call the function with parentheses

@app.route('/update_doctors', methods=['PUT'])
def Uodate_Doc():
    return UpdateDoctor.update_doctors()
@app.route('/update_receptionists', methods=['PUT'])
def Update_rece():
    return UpdateReceptionists.update_receptionists()
@app.route('/update_otherstaff', methods=['PUT'])
def Update_Staff():
    return UpdateStaff.update_otherstaff()
@app.route('/get_patient/<patient_id>', methods=['GET'])
def Get_patiEnts(patient_id):
    return Delete_Patient.get_patient(patient_id)

@app.route('/delete_patient/<patient_id>', methods=['DELETE'])
def Delete_Patients(patient_id):
    return Delete_Patient.delete_patient(patient_id)

@app.route('/get_receptionists/<r_id>', methods=['GET'])
def Get_receptionists(r_id):
    return Delete_Receptionist.get_receptionists(r_id)

@app.route('/delete_receptionists/<r_id>', methods=['DELETE'])
def Delete_receptionists(r_id):
    return Delete_Receptionist.delete_receptionists(r_id)

@app.route('/get_doctors/<dr_id>', methods=['GET'])
def Get_doctors(dr_id):
    return Delete_Doctor.get_doctors(dr_id)

@app.route('/delete_doctors/<dr_id>', methods=['DELETE'])
def Delete_doctors(dr_id):
    return Delete_Doctor.delete_doctors(dr_id)

@app.route('/get_medicine/<m_id>', methods=['GET'])
def Get_med(m_id):
    return DeleteMed.get_medicine(m_id)
 
@app.route('/delete_medicine/<m_id>', methods=['DELETE'])
def Delete_med(m_id):
    return DeleteMed.delete_medicine(m_id)

@app.route('/get_staffs/<s_id>', methods=['GET'])
def Get_staffs(s_id):
    return Delete_Otherstaffs.get_staffs(s_id)

@app.route('/delete_staffs/<s_id>', methods=['DELETE'])
def Delete_staffs(s_id):
    return Delete_Otherstaffs.delete_staffs(s_id)

@app.route('/otherstaffregister', methods=['POST'])
def add_newStaff():
    return Add_Other_Staff.add_new_other_staff()

@app.route('/medicineregister', methods=['POST'])
def med_reg():
    return Add_Medicine.add_new_medicine()

@app.route('/get-patient-details/<p_code>', methods=['GET'])
def Get_patient_details(p_code):
    return Bill.get_patient_details(p_code)

@app.route('/patient_dashboard', methods=['POST'])
def patient_dashboard_route():  # Changed function name to avoid conflict
    return Patient_dashboard.patient_dashboard()
@app.route('/get-doctor-fee/<dr_id>', methods=['GET'])
def Get_doctor_details(dr_id):
    return Bill.get_doctor_details(dr_id)
@app.route('/generate_bill', methods=['POST'])
def Generate_bill():
    return Bill.generate_bill()
@app.route('/get_patients/<doctor_username>', methods=['GET'])
def Get_patients(doctor_username):
    return Doctor_Dashboard.get_patients(doctor_username)
@app.route('/approve_bill', methods=['POST'])
def Approve_bill():
    return Doctor_Dashboard.approve_bill()
@app.route('/submit_analysis', methods=['POST'])
def Submit_analysis():
    return Doctor_Dashboard.submit_analysis()
@app.route('/prescribe_medicine', methods=['POST'])
def prescribe_medicine():
    return Doctor_Dashboard.prescribe_medicine()
@app.route('/get_medicines', methods=['GET'])
def Get_medicines():
    return Doctor_Dashboard.get_medicines()
@app.route('/doctor_dash', methods=['POST'])
def doc_dash():
    return Doctor_Dashboard.doctor_dashboard()
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
