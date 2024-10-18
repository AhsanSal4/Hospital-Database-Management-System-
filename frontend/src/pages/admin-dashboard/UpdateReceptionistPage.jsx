import React, { useState } from 'react';

const UpdateReceptionistPage = () => {
  const [receptionistID, setReceptionistID] = useState('');
  const [updateField, setUpdateField] = useState('');
  const [newValue, setNewValue] = useState('');
  
  const fields = [
    'Receptionist Name',
    'Gender',
    'Age',
    'Salary',
    'Password',
    'Work Hours',
  ];

  const handleUpdate = async (e) => {
    e.preventDefault();
    // Handle the update logic
    try {
      const response = await fetch(`/api/receptionists/${receptionistID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [updateField]: newValue }),
      });

      if (response.ok) {
        alert(`Updated ${updateField} successfully!`);
        // Clear the form
        setReceptionistID('');
        setUpdateField('');
        setNewValue('');
      } else {
        alert('Failed to update receptionist information.');
      }
    } catch (error) {
      console.error('Error updating receptionist:', error);
      alert('An error occurred while updating the receptionist.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-blue-400 text-white py-6 shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold">CityCare Hospital</h1>
          <p className="text-xl mt-2">Update Receptionist Information</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex justify-center items-center p-6">
        <section className="bg-white p-8 border border-gray-300 rounded-lg shadow-md">
          <form className="space-y-4" onSubmit={handleUpdate}>
            <div>
              <label htmlFor="receptionistID" className="block font-medium">Receptionist ID:</label>
              <input
                type="text"
                id="receptionistID"
                value={receptionistID}
                onChange={(e) => setReceptionistID(e.target.value)}
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

            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">
              Update Receptionist
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

export default UpdateReceptionistPage;
