import React, { useState } from 'react';

const DeleteOtherStaffPage = () => {
  const [staffID, setStaffID] = useState('');
  const [staffName, setStaffName] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Function to fetch the staff name based on the ID
  const fetchStaffName = async () => {
    if (!staffID) {
      alert('Please enter a Staff ID.');
      return;
    }

    try {
      const response = await fetch(`/api/otherstaff/${staffID}`);
      const data = await response.json();

      if (response.ok && data) {
        setStaffName(data.name);
        setIsConfirmed(false);
      } else {
        alert('Staff not found.');
        setStaffName('');
      }
    } catch (error) {
      console.error('Error fetching staff data:', error);
      alert('An error occurred while fetching staff data.');
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!isConfirmed) {
      alert('Please confirm the deletion.');
      return;
    }

    try {
      const response = await fetch(`/api/otherstaff/${staffID}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Staff deleted successfully');
        setStaffID('');
        setStaffName('');
        setIsConfirmed(false);
      } else {
        alert('Error deleting staff.');
      }
    } catch (error) {
      console.error('Error deleting staff:', error);
      alert('An error occurred while deleting the staff.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-blue-400 text-white py-6 shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold">CityCare Hospital</h1>
          <p className="text-xl mt-2">Delete Other Staff Record</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex justify-center items-center p-6">
        <section className="bg-white p-8 border border-gray-300 rounded-lg shadow-md">
          <form className="space-y-4" onSubmit={handleDelete}>
            <div>
              <label htmlFor="staffID" className="block font-medium">Staff ID:</label>
              <input
                type="text"
                id="staffID"
                value={staffID}
                onChange={(e) => setStaffID(e.target.value)}
                className="input-field"
                required
              />
              <button
                type="button"
                onClick={fetchStaffName}
                className="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Fetch Staff Name
              </button>
            </div>

            {staffName && (
              <div className="mt-4">
                <p className="font-medium">
                  Staff Name: <span className="font-bold">{staffName}</span>
                </p>
                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-blue-600"
                      checked={isConfirmed}
                      onChange={() => setIsConfirmed(true)}
                    />
                    <span className="ml-2">Confirm deletion of {staffName}</span>
                  </label>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200"
            >
              Delete Staff
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

export default DeleteOtherStaffPage;
