import React, { useState, useEffect } from 'react';

const ViewOtherstaffPage = () => {
  const [otherStaff, setOtherStaff] = useState([]);

  useEffect(() => {
    // Fetch other staff data from the server
    const fetchOtherStaff = async () => {
      try {
        const response = await fetch('/api/otherstaff'); // Adjust the API URL as needed
        const data = await response.json();
        setOtherStaff(data);
      } catch (error) {
        console.error('Error fetching other staff:', error);
      }
    };

    fetchOtherStaff();
  }, []);

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
                <tr key={staff.id}>
                  <td className="px-4 py-2 border">{staff.id}</td>
                  <td className="px-4 py-2 border">{staff.name}</td>
                  <td className="px-4 py-2 border">{staff.phonenumber}</td>
                  <td className="px-4 py-2 border">{staff.designation}</td>
                  <td className="px-4 py-2 border">{staff.gender}</td>
                  <td className="px-4 py-2 border">{staff.age}</td>
                  <td className="px-4 py-2 border">{staff.username}</td>
                  <td className="px-4 py-2 border">{staff.parkid}</td>
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
