import React, { useState } from 'react';
import '../../app.css'; // Import CSS file if needed

const DeletePatient = () => {
  const [patientID, setPatientID] = useState('');
  const [patientName, setPatientName] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Fetch patient name by ID
  const fetchPatientName = async () => {
    if (!patientID) {
      alert('Please enter a Patient ID.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/get_patient/${patientID}`);
      const data = await response.json();

      if (response.ok) {
        setPatientName(data.P_name);  // Assuming 'P_name' comes from the API response
        setIsConfirmed(false);
      } else {
        alert('Patient not found.');
        setPatientName('');
      }
    } catch (error) {
      console.error('Error fetching patient data:', error);
      alert('Error fetching patient data.');
    }
  };

  // Handle patient deletion
  const handleDelete = async (e) => {
    e.preventDefault();
    if (!isConfirmed) {
      alert('Please confirm the deletion.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/delete_patient/${patientID}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Patient deleted successfully');
        setPatientID('');
        setPatientName('');
        setIsConfirmed(false);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error deleting patient:', error);
      alert('An error occurred while deleting the patient.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <header className="bg-gradient-to-r from-blue-500 to-blue-400 text-white py-6 shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold">CityCare Hospital</h1>
          <p className="text-xl mt-2">Delete Patient Record</p>
        </div>
      </header>

      <main className="flex-grow flex justify-center items-center p-6">
        <section className="bg-white p-8 border border-gray-300 rounded-lg shadow-md">
          <form className="space-y-4" onSubmit={handleDelete}>
            <div>
              <label htmlFor="patientID" className="block font-medium">Patient ID:</label>
              <input
                type="text"
                id="patientID"
                value={patientID}
                onChange={(e) => setPatientID(e.target.value)}
                className="input-field"
                required
              />
              <button
                type="button"
                onClick={fetchPatientName}
                className="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Fetch Patient Name
              </button>
            </div>

            {patientName && (
              <div>
                <p className="mt-2">Patient Name: <strong>{patientName}</strong></p>
                <label className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    checked={isConfirmed}
                    onChange={(e) => setIsConfirmed(e.target.checked)}
                    className="mr-2"
                  />
                  <span>Confirm deletion</span>
                </label>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200"
            >
              Delete Patient
            </button>
          </form>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; {new Date().getFullYear()} CityCare Hospital. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DeletePatient;
