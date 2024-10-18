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
    password: '',
  });

  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOtherStaffData({ ...otherStaffData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make POST request to Flask backend
    fetch('http://localhost:5000/otherstaffregister', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(otherStaffData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setModalMessage('Error: ' + data.error);
        } else {
          setModalMessage('New staff member registered successfully!');
          // Clear the form if needed
          setOtherStaffData({
            name: '',
            phonenumber: '',
            designation: '',
            gender: '',
            age: '',
            username: '',
            password: '',
          });
        }
        setIsModalOpen(true); // Open the modal
      })
      .catch((error) => {
        console.error('Error:', error);
        setModalMessage('Error: ' + error.message);
        setIsModalOpen(true); // Open the modal
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-8 text-blue-600">Register New Staff</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
        <div className="mb-4">
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
        <div className="mb-4">
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
        <div className="mb-4">
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
        <div className="mb-4">
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
        <div className="mb-4">
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
        <div className="mb-4">
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
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Password:</label>
          <input
            type="text"
            name="password"
            value={otherStaffData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          Register Staff
        </button>
      </form>
      {isModalOpen && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  );
};

export default RegisterOtherstaffPage;
