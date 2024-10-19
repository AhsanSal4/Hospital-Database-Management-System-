import React, { useState } from 'react';
import '../../app.css'; // Import CSS file if needed

const UpdateDoctorPage = () => {
  const [doctorID, setDoctorID] = useState('');
  const [updateField, setUpdateField] = useState('');
  const [newValue, setNewValue] = useState('');

  const fields = [
    'Dr_name',
    'Age',
    'Gender',
    'Specialization',
    'Salary',
    'fees',
    'Username',
    'Ph_No',
    'Working_Hrs',
    'Park_id',
  ];

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/update_doctors', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctorID,       // Correctly use the doctorID state
          updateField,
          newValue,
        }),
      });

      if (response.ok) {
        alert(`Updated ${updateField} successfully!`);
        // Clear the fields after update
        setDoctorID('');
        setUpdateField('');
        setNewValue('');
      } else {
        const errorData = await response.json(); // Get the error message
        alert(`Failed to update doctor information: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error updating doctor:', error);
      alert('An error occurred while updating the doctor.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-blue-400 text-white py-6 shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold">CityCare Hospital</h1>
          <p className="text-xl mt-2">Update Doctor Information</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex justify-center items-center p-6">
        <section className="bg-white p-8 border border-gray-300 rounded-lg shadow-md transform transition-transform hover:scale-105 duration-300">
          <form className="space-y-4" onSubmit={handleUpdate}>
            <div>
              <label htmlFor="doctorID" className="block font-medium">Doctor ID:</label>
              <input
                type="text"
                id="doctorID"
                value={doctorID}
                onChange={(e) => setDoctorID(e.target.value)}
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
              Update Doctor
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

export default UpdateDoctorPage;
