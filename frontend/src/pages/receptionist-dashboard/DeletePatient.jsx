import React, { useState } from 'react';
import '../../app.css'; // Import CSS file if needed

const DeletePatient = () => {
  const [patientID, setPatientID] = useState('');
  const [patientName, setPatientName] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Function to fetch the patient name based on the patient ID
  const fetchPatientName = async () => {
    if (!patientID) {
      alert('Please enter a Patient ID.');
      return;
    }

    try {
      const response = await fetch(`/api/patients/${patientID}`); // Adjust URL as needed
      const data = await response.json();

      // Check if the patient exists
      if (response.ok && data) {
        setPatientName(data.name); // Assuming the API returns an object with a 'name' property
        setIsConfirmed(false); // Reset confirmation state
      } else {
        alert('Patient not found.');
        setPatientName(''); // Reset patient name if not found
      }
    } catch (error) {
      console.error('Error fetching patient data:', error);
      alert('An error occurred while fetching patient data.');
    }
  };

  // Function to handle the delete action
  const handleDelete = async (e) => {
    e.preventDefault();
    if (!isConfirmed) {
      alert('Please confirm the deletion.');
      return;
    }

    try {
      const response = await fetch(`/api/patients/${patientID}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Patient deleted successfully');
        // Reset the form
        setPatientID('');
        setPatientName('');
        setIsConfirmed(false);
      } else {
        alert('Error deleting patient.');
      }
    } catch (error) {
      console.error('Error deleting patient:', error);
      alert('An error occurred while deleting the patient.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-blue-400 text-white py-6 shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold">CityCare Hospital</h1>
          <p className="text-xl mt-2">Delete Patient Record</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex justify-center items-center p-6">
        <section className="bg-white p-8 border border-gray-300 rounded-lg shadow-md transform transition-transform hover:scale-105 duration-300">
          <form className="space-y-4" onSubmit={handleDelete}>
            <div>
              <label htmlFor="patientID" className="block font-medium">
                Patient ID:
              </label>
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
              <div className="mt-4">
                <p className="font-medium">
                  Patient Name: <span className="font-bold">{patientName}</span>
                </p>
                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-blue-600"
                      checked={isConfirmed}
                      onChange={() => setIsConfirmed(true)}
                    />
                    <span className="ml-2">Confirm deletion of {patientName}</span>
                  </label>
                </div>
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

      {/* Footer */}
      <footer className="bg-blue-500 text-white text-center py-4">
        <p>&copy; 2024 CityCare Hospital | Your health, our priority.</p>
      </footer>
    </div>
  );
};

export default DeletePatient;
