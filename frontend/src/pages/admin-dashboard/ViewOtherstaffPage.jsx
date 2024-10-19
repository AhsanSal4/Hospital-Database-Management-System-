import React, { useState, useEffect } from 'react';

const ViewOtherstaffPage = () => {
  const [otherStaff, setOtherStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch other staff data from the server
    const fetchOtherStaff = async () => {
      try {
        const response = await fetch('http://localhost:5000/get_all_staffs'); // Adjust the backend URL as needed
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOtherStaff(data);
      } catch (error) {
        console.error('Error fetching other staff:', error);
        setError(error.message); // Store the error message to display later
      } finally {
        setLoading(false); // Always set loading to false after fetch
      }
    };

    fetchOtherStaff();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><p>Loading staff data...</p></div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center"><p>Error: {error}</p></div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-blue-400 text-white py-6 shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold">CityCare Hospital</h1>
          <p className="text-xl mt-2">View Other Staff</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6">
        <section className="bg-white p-8 border border-gray-300 rounded-lg shadow-md">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Phone Number</th>
                <th className="px-4 py-2 border">Designation</th>
                <th className="px-4 py-2 border">Gender</th>
                <th className="px-4 py-2 border">Age</th>
                <th className="px-4 py-2 border">Username</th>
                <th className="px-4 py-2 border">Park ID</th>
              </tr>
            </thead>
            <tbody>
              {otherStaff.map((staff) => (
                <tr key={staff.S_id}>
                  <td className="px-4 py-2 border">{staff.S_id}</td>
                  <td className="px-4 py-2 border">{staff.S_name}</td>
                  <td className="px-4 py-2 border">{staff.Ph_No}</td>
                  <td className="px-4 py-2 border">{staff.Designation}</td>
                  <td className="px-4 py-2 border">{staff.Gender}</td>
                  <td className="px-4 py-2 border">{staff.Age}</td>
                  <td className="px-4 py-2 border">{staff.Username}</td>
                  <td className="px-4 py-2 border">{staff.Park_id}</td>
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

export default ViewOtherstaffPage;
