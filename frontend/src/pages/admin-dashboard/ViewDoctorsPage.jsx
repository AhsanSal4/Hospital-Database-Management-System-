import React, { useEffect, useState } from 'react';

const ViewDoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Fetch doctors data from the database (replace with your API call)
    fetch('/api/doctors')
      .then((response) => response.json())
      .then((data) => setDoctors(data))
      .catch((error) => console.error('Error fetching doctors:', error));
  }, []);

  return (
    <div className="container mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold text-center mb-8">Doctor List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-5">Full Name</th>
              <th className="py-3 px-5">Gender</th>
              <th className="py-3 px-5">Specialisation</th>
              <th className="py-3 px-5">Age</th>
              <th className="py-3 px-5">Salary</th>
              <th className="py-3 px-5">Fees</th>
              <th className="py-3 px-5">Password</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id} className="hover:bg-gray-100 transition duration-300">
                <td className="py-3 px-5">{doctor.fullName}</td>
                <td className="py-3 px-5">{doctor.gender}</td>
                <td className="py-3 px-5">{doctor.specialisation}</td>
                <td className="py-3 px-5">{doctor.age}</td>
                <td className="py-3 px-5">{doctor.salary}</td>
                <td className="py-3 px-5">{doctor.fees}</td>
                <td className="py-3 px-5">{doctor.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewDoctorsPage;
