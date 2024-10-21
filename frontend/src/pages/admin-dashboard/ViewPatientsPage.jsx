import React, { useEffect, useState } from 'react';

const ViewPatientsPage = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Fetch the patient data from the Flask backend
    const fetchPatients = async () => {
      try {
        const response = await fetch('http://localhost:5000/get_all_patients'); // Adjust the backend URL as needed
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };
  
    fetchPatients();
  }, []);
  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-8 text-blue-600">View Patients</h1>

      <div className="overflow-x-auto w-full max-w-6xl">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Phone</th>
              <th className="py-2 px-4 text-left">Gender</th>
              <th className="py-2 px-4 text-left">Age</th>
              <th className="py-2 px-4 text-left">Height (cm)</th>
              <th className="py-2 px-4 text-left">Weight (kg)</th>
              <th className="py-2 px-4 text-left">Date of Admit</th>
              <th className="py-2 px-4 text-left">Disease</th>
              <th className="py-2 px-4 text-left">Doctor</th>
              <th className="py-2 px-4 text-left">Username</th>
              <th className="py-2 px-4 text-left">Park_id</th>
              <th className="py-2 px-4 text-left">Bill</th>
              <th className="py-2 px-4 text-left">Patient_Reports</th>
            </tr>
          </thead>
          <tbody>
            {patients.length > 0 ? (
              patients.map((patient, index) => (
                <tr
                  key={index}
                  className="hover:bg-blue-100 transition-colors duration-300"
                >
                  <td className="py-2 px-4 border-b border-gray-200">{patient.P_id}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{patient.P_name}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{patient.Ph_No}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{patient.Gender}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{patient.Age}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{patient.Height_cm}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{patient.Weight_kg}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{patient.Dt_admit}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{patient.Disease}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{patient.Dr_id}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{patient.Username}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{patient.Park_id}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{patient.Bill}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{patient.Username}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="py-4 text-center text-gray-500">
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewPatientsPage;
