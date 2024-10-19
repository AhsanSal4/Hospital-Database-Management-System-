import React, { useState } from 'react';
import '../../app.css'; // Import CSS file if needed

const DeleteReceptionistPage = () => {
  const [receptionistID, setReceptionistID] = useState('');
  const [receptionistName, setReceptionistName] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Function to fetch the receptionist name based on the ID
  const fetchReceptionistName = async () => {
    if (!receptionistID) {
      alert('Please enter a Receptionist ID.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/get_receptionists/${receptionistID}`); // Use receptionistID
      const data = await response.json();

      if (response.ok) {
        setReceptionistName(data.R_name); // Correctly set the name
        setIsConfirmed(false); // Reset confirmation
      } else {
        alert(data.error || 'Receptionist not found.'); // Handle error message properly
        setReceptionistName('');
      }
    } catch (error) {
      console.error('Error fetching receptionist data:', error);
      alert('An error occurred while fetching receptionist data.');
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
      const response = await fetch(`http://localhost:5000/delete_receptionists/${receptionistID}`, {
        method: 'DELETE',
      });

      const data = await response.json(); // Get JSON response

      if (response.ok) {
        alert('Receptionist deleted successfully');
        setReceptionistID('');
        setReceptionistName('');
        setIsConfirmed(false);
      } else {
        alert(data.error || 'Error deleting receptionist.'); // Use data.error if available
      }
    } catch (error) {
      console.error('Error deleting receptionist:', error);
      alert('An error occurred while deleting the receptionist.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-blue-400 text-white py-6 shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold">CityCare Hospital</h1>
          <p className="text-xl mt-2">Delete Receptionist Record</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex justify-center items-center p-6">
        <section className="bg-white p-8 border border-gray-300 rounded-lg shadow-md">
          <form className="space-y-4" onSubmit={handleDelete}>
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
              <button
                type="button"
                onClick={fetchReceptionistName}
                className="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Fetch Receptionist Name
              </button>
            </div>

            {receptionistName && (
              <div className="mt-4">
                <p className="font-medium">
                  Receptionist Name: <span className="font-bold">{receptionistName}</span>
                </p>
                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-blue-600"
                      checked={isConfirmed}
                      onChange={() => setIsConfirmed(true)}
                    />
                    <span className="ml-2">Confirm deletion of {receptionistName}</span>
                  </label>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200"
            >
              Delete Receptionist
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

export default DeleteReceptionistPage;
