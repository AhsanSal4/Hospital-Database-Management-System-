import React, { useEffect, useState } from 'react';

const ViewDoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Fetch the patient data from the Flask backend
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:5000/display_all_doctors'); // Adjust the backend URL as needed
        const data = await response.json();
        setDoctors(data);

      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
  
    fetchDoctors();
  }, []);

  return (
    <div className="container mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold text-center mb-8">Doctor List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-5">Dr.ID</th>
              <th className="py-3 px-5">Full Name</th>
              <th className="py-3 px-5">Gender</th>
              <th className="py-3 px-5">Specialisation</th>
              <th className="py-3 px-5">Age</th>
              <th className="py-3 px-5">Salary</th>
              <th className="py-3 px-5">Fees</th>
              <th className="py-3 px-5">Username</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id} className="hover:bg-gray-100 transition duration-300">
<<<<<<< HEAD
=======
                <td className="py-3 px-5">{doctor.Dr_id}</td>
>>>>>>> ac572aa7f51ab17beb358ee39e9a2c33d16d92c9
                <td className="py-3 px-5">{doctor.Dr_name}</td>
                <td className="py-3 px-5">{doctor.Gender}</td>
                <td className="py-3 px-5">{doctor.Specialization}</td>
                <td className="py-3 px-5">{doctor.Age}</td>
                <td className="py-3 px-5">{doctor.Salary}</td>
                <td className="py-3 px-5">{doctor.fees}</td>
                <td className="py-3 px-5">{doctor.Username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewDoctorsPage;
