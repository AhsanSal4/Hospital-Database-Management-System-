import React, { useState } from 'react';
import '../../app.css'; // Import CSS file if needed

const UpdatePatient = () => {
  const [patientID, setPatientID] = useState('');
  const [updateField, setUpdateField] = useState('');
  const [newValue, setNewValue] = useState('');
  
  const fields = [
    'Full Name',
    'Age',
    'Gender',
    'Contact Number',
    'Known Allergies',
    'Previous Treatments',
    'Current Diagnosis',
    'Prescribed Medicines',
  ];

  const handleUpdate = (e) => {
    e.preventDefault();
    // Handle the update logic here
    console.log(`Updating ${updateField} for Patient ID ${patientID} to ${newValue}`);
    // Clear the fields after update
    setPatientID('');
    setUpdateField('');
    setNewValue('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-blue-400 text-white py-6 shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold">CityCare Hospital</h1>
          <p className="text-xl mt-2">Update Patient Information</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex justify-center items-center p-6">
        <section className="bg-white p-8 border border-gray-300 rounded-lg shadow-md transform transition-transform hover:scale-105 duration-300">
          <form className="space-y-4" onSubmit={handleUpdate}>
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
            </div>

            <div>
              <label htmlFor="updateField" className="block font-medium">Select Field to Update:</label>
              <select
                id="updateField"
                value={updateField}
                onChange={(e) => setUpdateField(e.target.value)}
                className="input-field"
                required
              >
                <option value="" disabled>Select an option</option>
                {fields.map((field, index) => (
                  <option key={index} value={field}>{field}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="newValue" className="block font-medium">New Value:</label>
              <input
                type="text"
                id="newValue"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
              Update Patient
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

export default UpdatePatient;
