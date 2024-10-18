import React, { useState, useEffect } from 'react';

const ViewReceptionistPage = () => {
  const [receptionists, setReceptionists] = useState([]);

  useEffect(() => {
    // Fetch receptionist data from the server
    const fetchReceptionists = async () => {
      try {
        const response = await fetch('/api/receptionists'); // Adjust the API URL as needed
        const data = await response.json();
        setReceptionists(data);
      } catch (error) {
        console.error('Error fetching receptionists:', error);
      }
    };

    fetchReceptionists();
  }, []);

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
                <th className="px-4 py-2 border">Receptionist Name</th>
                <th className="px-4 py-2 border">Gender</th>
                <th className="px-4 py-2 border">Age</th>
                <th className="px-4 py-2 border">Salary</th>
                <th className="px-4 py-2 border">Password</th>
                <th className="px-4 py-2 border">Work Hours</th>
              </tr>
            </thead>
            <tbody>
              {receptionists.map((receptionist) => (
                <tr key={receptionist.id}>
                  <td className="px-4 py-2 border">{receptionist.receptionist_name}</td>
                  <td className="px-4 py-2 border">{receptionist.gender}</td>
                  <td className="px-4 py-2 border">{receptionist.age}</td>
                  <td className="px-4 py-2 border">{receptionist.salary}</td>
                  <td className="px-4 py-2 border">{receptionist.password}</td>
                  <td className="px-4 py-2 border">{receptionist.work_hours}</td>
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
