import React, { useState } from 'react';
import Modal from '../../components/Modal'; // Make sure the path is correct

const RegisterOtherstaffPage = () => {
  const [otherStaffData, setOtherStaffData] = useState({
    name: '',
    phonenumber: '',
    designation: '',
    gender: '',
    age: '',
    username: '',
    parkid: '',
    pwd: '',
    role: '',
    owner: '',
    last_login: '',
    password: '',
  });

  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOtherStaffData({ ...otherStaffData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/register_other_staff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(otherStaffData),
      });

      const data = await response.json(); // Capture response data
      if (response.ok) {
        setModalMessage('New staff member registered successfully!');
        setOtherStaffData({ // Reset the form
          name: '',
          phonenumber: '',
          designation: '',
          gender: '',
          age: '',
          username: '',
          parkid: '',
          pwd: '',
          role: '',
          owner: '',
          last_login: '',
          password: '',
        });
      } else {
        setModalMessage('Error: ' + (data.message || 'Registration failed.'));
      }
    } catch (error) {
      console.error('Error registering staff:', error);
      setModalMessage('Error: ' + error.message);
    }
    setIsModalOpen(true); // Open the modal after submit
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-8 text-blue-600">Register New Staff</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full space-y-4">
        <div>
          <label className="block text-gray-700 font-bold mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={otherStaffData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Phone Number:</label>
          <input
            type="tel"
            name="phonenumber"
            value={otherStaffData.phonenumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Designation:</label>
          <input
            type="text"
            name="designation"
            value={otherStaffData.designation}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Gender:</label>
          <select
            name="gender"
            value={otherStaffData.gender}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            required
          >
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Age:</label>
          <input
            type="number"
            name="age"
            value={otherStaffData.age}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Username:</label>
          <input
            type="text"
            name="username"
            value={otherStaffData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Park ID:</label>
          <input
            type="text"
            name="parkid"
            value={otherStaffData.parkid}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Password:</label>
          <input
            type="password"
            name="pwd"
            value={otherStaffData.pwd}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Last Login:</label>
          <input
            type="datetime-local"
            name="last_login"
            value={otherStaffData.last_login}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-blue-600"
        >
          Register Staff
        </button>

        {isModalOpen && <Modal message={modalMessage} onClose={closeModal} />}
      </form>
    </div>
  );
};

export default RegisterOtherstaffPage;
