import React, { useState, useEffect } from 'react';

const ViewReceptionistPage = () => {
  const [receptionists, setReceptionists] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch receptionist data from the server
    const fetchReceptionists = async () => {
      try {
        const response = await fetch('http://localhost:5000/get_all_receptionists'); // Adjust the backend URL as needed
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setReceptionists(data);
      } catch (error) {
        setError(error.message); // Set the error message
        console.error('Error fetching receptionists:', error);
      } finally {
        setLoading(false); // Set loading to false regardless of the fetch result
      }
    };

    fetchReceptionists();
  }, []);

  // Render loading or error messages
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading receptionists...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-blue-400 text-white py-6 shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold">CityCare Hospital</h1>
          <p className="text-xl mt-2">View Receptionists</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6">
        <section className="bg-white p-8 border border-gray-300 rounded-lg shadow-md">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Receptionist Name</th>
                <th className="px-4 py-2 border">Gender</th>
                <th className="px-4 py-2 border">Age</th>
                <th className="px-4 py-2 border">Salary</th>
                <th className="px-4 py-2 border">Username</th>
                <th className="px-4 py-2 border">Work Hours</th>
              </tr>
            </thead>
            <tbody>
              {receptionists.map((receptionist) => (
                <tr key={receptionist.R_id}>
                  <td className="px-4 py-2 border">{receptionist.R_id}</td>                 
                  <td className="px-4 py-2 border">{receptionist.R_name}</td>
                  <td className="px-4 py-2 border">{receptionist.Gender}</td>
                  <td className="px-4 py-2 border">{receptionist.Age}</td>
                  <td className="px-4 py-2 border">{receptionist.Salary}</td>
                  <td className="px-4 py-2 border">{receptionist.Username}</td>
                  <td className="px-4 py-2 border">{receptionist.Working_hrs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-500 text-white text-center py-4">
        <p>&copy; 2024 CityCare Hospital | Your health, our priority.</p>
      </footer>
    </div>
  );
};

export default ViewReceptionistPage;
