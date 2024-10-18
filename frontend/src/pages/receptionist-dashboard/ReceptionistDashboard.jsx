import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer.jsx';

const ReceptionistDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <nav className="bg-blue-700 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl">CityCare Hospital</h1>
        <div>
      <Link to="/">
      <button className="bg-white text-blue-700 px-4 py-2 rounded">Log Out</button>
      </Link>
        </div>
      </div>
    </nav>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">Receptionist Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full px-6 max-w-4xl">
        {/* Card 1: Register New Patient */}
        <div className="bg-white rounded-lg shadow-lg p-6 hover:scale-105 transition-transform duration-300 ease-in-out">
          <h2 className="text-xl font-semibold text-blue-500">Register New Patient</h2>
          <p className="text-gray-600 mt-2">Add a new patient and their details.</p>
          <button
            onClick={() => navigate("/register-patient")}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
          >
            Register Patient
          </button>
        </div>

        {/* Card 2: Update Patient Details */}
        <div className="bg-white rounded-lg shadow-lg p-6 hover:scale-105 transition-transform duration-300 ease-in-out">
          <h2 className="text-xl font-semibold text-blue-500">Update Patient Details</h2>
          <p className="text-gray-600 mt-2">Modify existing patient information.</p>
          <button
            onClick={() => navigate("/update-patient")}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
          >
            Update Patient
          </button>
        </div>

        {/* Card 3: Delete Patient */}
        <div className="bg-white rounded-lg shadow-lg p-6 hover:scale-105 transition-transform duration-300 ease-in-out">
          <h2 className="text-xl font-semibold text-red-500">Delete Patient</h2>
          <p className="text-gray-600 mt-2">Remove a patient from the database.</p>
          <button
            onClick={() => navigate("/delete-patient")}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
          >
            Delete Patient
          </button>
        </div>

        {/* Card 4: Generate Bill */}
        <div className="bg-white rounded-lg shadow-lg p-6 hover:scale-105 transition-transform duration-300 ease-in-out">
          <h2 className="text-xl font-semibold text-green-500">Generate Bill</h2>
          <p className="text-gray-600 mt-2">Generate a bill for the patient.</p>
          <button
            onClick={() => navigate("/generate-bill")}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
          >
            Generate Bill
          </button>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
    
  );
};

export default ReceptionistDashboard;
