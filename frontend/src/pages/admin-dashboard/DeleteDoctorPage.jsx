import React, { useState } from 'react';
import '../../app.css'; // Import CSS file if needed

const DeleteDoctorPage = () => {
  const [doctorID, setDoctorID] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Function to fetch the doctor name based on the doctor ID
  const fetchDoctorName = async () => {
    if (!doctorID) {
      alert('Please enter a Doctor ID.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/get_doctors/${doctorID}`); // Use receptionistID
      const data = await response.json();

      // Check if the doctor exists
      if (response.ok) {
        setDoctorName(data.Dr_name); // Assuming the API returns an object with a 'name' property
        setIsConfirmed(false); // Reset confirmation state
      } else {
        alert(data.error || 'Doctor not found.'); // Handle error message properly
        setDoctorName(''); // Reset doctor name if not found
      }
    } catch (error) {
      console.error('Error fetching doctor data:', error);
      alert('An error occurred while fetching doctor data.');
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
      const response = await fetch(`http://localhost:5000/delete_doctors/${doctorID}`, {
        method: 'DELETE',
      });
      const data = await response.json(); // Get JSON response

      if (response.ok) {
        alert('Doctor deleted successfully');
        // Reset the form
        setDoctorID('');
        setDoctorName('');
        setIsConfirmed(false);
      } else {
        alert(data.error ||'Error deleting doctor.');
      }
    } catch (error) {
      console.error('Error deleting doctor:', error);
      alert('An error occurred while deleting the doctor.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-blue-400 text-white py-6 shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold">CityCare Hospital</h1>
          <p className="text-xl mt-2">Delete Doctor Record</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex justify-center items-center p-6">
        <section className="bg-white p-8 border border-gray-300 rounded-lg shadow-md transform transition-transform hover:scale-105 duration-300">
          <form className="space-y-4" onSubmit={handleDelete}>
            <div>
              <label htmlFor="doctorID" className="block font-medium">
                Doctor ID:
              </label>
              <input
                type="text"
                id="doctorID"
                value={doctorID}
                onChange={(e) => setDoctorID(e.target.value)}
                className="input-field"
                required
              />
              <button
                type="button"
                onClick={fetchDoctorName}
                className="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Fetch Doctor Name
              </button>
            </div>

            {doctorName && (
              <div className="mt-4">
                <p className="font-medium">
                  Doctor Name: <span className="font-bold">{doctorName}</span>
                </p>
                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-blue-600"
                      checked={isConfirmed}
                      onChange={() => setIsConfirmed(true)}
                    />
                    <span className="ml-2">Confirm deletion of {doctorName}</span>
                  </label>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200"
            >
              Delete Doctor
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

export default DeleteDoctorPage;
