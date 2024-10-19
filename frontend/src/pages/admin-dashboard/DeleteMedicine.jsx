import React, { useState } from 'react';
import '../../app.css'; // Import CSS file if needed

const DeleteMedicinePage = () => {
  const [medicineID, setMedicineID] = useState('');
  const [medicineName, setMedicineName] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Function to fetch the medicine name based on the medicine ID
  const fetchMedicineName = async () => {
    if (!medicineID) {
      alert('Please enter a Medicine ID.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/get_medicine/${medicineID}`);
      const data = await response.json();

      // Check if the medicine exists
      if (response.ok) {
        setMedicineName(data.m_name); // Assuming the API returns an object with a 'm_name' property
        setIsConfirmed(false); // Reset confirmation state
      } else {
        alert(data.error || 'Medicine not found.');
        setMedicineName(''); // Reset medicine name if not found
      }
    } catch (error) {
      console.error('Error fetching medicine data:', error);
      alert('An error occurred while fetching medicine data.');
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
      const response = await fetch(`http://localhost:5000/delete_medicine/${medicineID}`, {
        method: 'DELETE',
      });
      const data = await response.json(); // Get JSON response

      if (response.ok) {
        alert('Medicine deleted successfully');
        // Reset the form
        setMedicineID('');
        setMedicineName('');
        setIsConfirmed(false);
      } else {
        alert(data.error || 'Error deleting medicine.');
      }
    } catch (error) {
      console.error('Error deleting medicine:', error);
      alert('An error occurred while deleting the medicine.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-blue-400 text-white py-6 shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold">CityCare Hospital</h1>
          <p className="text-xl mt-2">Delete Medicine Record</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex justify-center items-center p-6">
        <section className="bg-white p-8 border border-gray-300 rounded-lg shadow-md transform transition-transform hover:scale-105 duration-300">
          <form className="space-y-4" onSubmit={handleDelete}>
            <div>
              <label htmlFor="medicineID" className="block font-medium">
                Medicine ID:
              </label>
              <input
                type="text"
                id="medicineID"
                value={medicineID}
                onChange={(e) => setMedicineID(e.target.value)}
                className="input-field"
                required
              />
              <button
                type="button"
                onClick={fetchMedicineName}
                className="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Fetch Medicine Name
              </button>
            </div>

            {medicineName && (
              <div className="mt-4">
                <p className="font-medium">
                  Medicine Name: <span className="font-bold">{medicineName}</span>
                </p>
                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-blue-600"
                      checked={isConfirmed}
                      onChange={() => setIsConfirmed(true)}
                    />
                    <span className="ml-2">Confirm deletion of {medicineName}</span>
                  </label>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200"
            >
              Delete Medicine
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

export default DeleteMedicinePage;
