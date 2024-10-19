import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RegisterPage from './pages/RegisterPage';
import LoginSelectionPage from './pages/LoginSelectionPage';
import DoctorLoginPage from './pages/DoctorLoginPage';
import ReceptionistLoginPage from './pages/ReceptionistLoginPage';
import PatientLoginPage from './pages/PatientLoginPage';
import ReceptionistDashboard from './pages/receptionist-dashboard/ReceptionistDashboard';
import RegisterPatientPage from './pages/receptionist-dashboard/RegisterPatientPage';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import UpdatePatient from './pages/receptionist-dashboard/UpdatePatient';
import DeletePatient from './pages/receptionist-dashboard/DeletePatient';
import AdminDashboard from './pages/admin-dashboard/AdminDashboard';
import ViewPatientsPage from './pages/admin-dashboard/ViewPatientsPage';
import ManagePatient from './pages/admin-dashboard/ManagePatient';
import ManageDoctor from './pages/admin-dashboard/ManageDoctor';
import ViewDoctorsPage from './pages/admin-dashboard/ViewDoctorsPage';
import UpdateDoctorPage from './pages/admin-dashboard/UpdateDoctorPage';
import DeleteDoctorPage from './pages/admin-dashboard/DeleteDoctorPage';
import ManageReceptionist from './pages/admin-dashboard/ManageReceptionist';
import ViewReceptionistPage from './pages/admin-dashboard/ViewReceptionistsPage';
import UpdateReceptionistPage from './pages/admin-dashboard/UpdateReceptionistPage';
import DeleteReceptionistPage from './pages/admin-dashboard/DeleteReceptionistPage';
import ManageOtherstaff from './pages/admin-dashboard/ManageOtherstaff';
import ViewOtherstaffPage from './pages/admin-dashboard/ViewOtherstaffPage';
import UpdateOtherstaffPage from './pages/admin-dashboard/UpdateOtherstaffPage';
import DeleteOtherStaffPage from './pages/admin-dashboard/DeleteOtherstaffPage';
import RegisterOtherstaffPage from './pages/admin-dashboard/RegisterOtherstaffPage';
import AdminLoginPage from './pages/AdminLoginPage';
import ViewMedicines from './pages/admin-dashboard/ViewMedicines';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login-selection" element={<LoginSelectionPage />} />
          <Route path="/login-doctor" element={<DoctorLoginPage />} />
          <Route path="/login-receptionist" element={<ReceptionistLoginPage />} />
          <Route path="/login-patient" element={<PatientLoginPage />} />
          <Route path="/receptionist-dashboard" element={<ReceptionistDashboard/>} />
          <Route path="/register-patient" element={<RegisterPatientPage/>} />
          <Route path="/patient-dashboard" element={<PatientDashboard/>} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard/>} />
          <Route path="/update-patient" element={<UpdatePatient/>} />
          <Route path="/delete-patient" element={<DeletePatient/>} />
          <Route path="/admin-dashboard" element={<AdminDashboard/>} />
          <Route path="/view-patients" element={<ViewPatientsPage/>} />
          <Route path="/manage-patient" element={<ManagePatient/>} />
          <Route path="/manage-doctor" element={<ManageDoctor/>} />
          <Route path="/view-doctors" element={<ViewDoctorsPage/>} />
          <Route path="/update-doctor" element={<UpdateDoctorPage/>} />
          <Route path="/delete-doctor" element={<DeleteDoctorPage/>} />
          <Route path="/manage-receptionist" element={<ManageReceptionist/>} />
          <Route path="/view-receptionists" element={<ViewReceptionistPage/>} />
          <Route path="/update-receptionist" element={<UpdateReceptionistPage/>} />
          <Route path="/delete-receptionist" element={<DeleteReceptionistPage/>} />
          <Route path="/manage-otherstaff" element={<ManageOtherstaff/>} />
          <Route path="/view-otherstaffs" element={<ViewOtherstaffPage/>} />
          <Route path="/update-otherstaff" element={<UpdateOtherstaffPage/>} />
          <Route path="/delete-otherstaff" element={<DeleteOtherStaffPage/>} />
          <Route path="/register-otherstaff" element={<RegisterOtherstaffPage/>} />
          <Route path="/admin-login" element={<AdminLoginPage/>} />
          <Route path="/view-medicine" element={<ViewMedicines/>} />



        </Routes>
      </div>
    </Router>
  );
}

export default App;
