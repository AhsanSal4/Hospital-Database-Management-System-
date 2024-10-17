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

        </Routes>
      </div>
    </Router>
  );
}

export default App;
