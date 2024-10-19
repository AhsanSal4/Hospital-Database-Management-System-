import React, { useState } from 'react';

const RegisterOtherstaffPage = () => {
  const [otherStaffData, setOtherStaffData] = useState({
    id: '',
    name: '',
    phonenumber: '',
    designation: '',
    gender: '',
    age: '',
    username: '',
    parkid: '',
    pwd: '',
<<<<<<< HEAD
    role: '', // Changed to text input
    owner: '', // New field for parking owner
    last_login: '', // New field for last login
=======
>>>>>>> ac572aa7f51ab17beb358ee39e9a2c33d16d92c9
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOtherStaffData({ ...otherStaffData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
<<<<<<< HEAD
      const response = await fetch('http://localhost:5000/register_other_staff', {
=======
      const response = await fetch('http://localhost:5000/otherstaffregister', {
>>>>>>> ac572aa7f51ab17beb358ee39e9a2c33d16d92c9
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(otherStaffData),
      });

      if (response.ok) {
        setMessage('New staff member registered successfully!');
        setOtherStaffData({
          id: '',
          name: '',
          phonenumber: '',
          designation: '',
          gender: '',
          age: '',
          username: '',
<<<<<<< HEAD
          parkid: '',
          pwd: '',
          role: '',
          owner: '', // Reset the owner field
          last_login: '', // Reset the last login field
=======
          pwd: '',
>>>>>>> ac572aa7f51ab17beb358ee39e9a2c33d16d92c9
        });
      } else {
        const errorData = await response.json();
        setMessage(errorData.message);
      }
    } catch (error) {
      console.error('Error registering staff:', error);
      setMessage('An error occurred while registering the staff.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-blue-400 text-white py-6 shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold">CityCare Hospital</h1>
          <p className="text-xl mt-2">Register New Staff</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex justify-center items-center p-6">
        <section className="bg-white p-8 border border-gray-300 rounded-lg shadow-md w-full max-w-md">
          <form className="space-y-4" onSubmit={handleSubmit}>

            <div>
              <label htmlFor="name" className="block font-medium">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={otherStaffData.name}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label htmlFor="phonenumber" className="block font-medium">Phone Number:</label>
              <input
                type="tel"
                id="phonenumber"
                name="phonenumber"
                value={otherStaffData.phonenumber}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label htmlFor="designation" className="block font-medium">Designation:</label>
              <input
                type="text"
                id="designation"
                name="designation"
                value={otherStaffData.designation}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label htmlFor="gender" className="block font-medium">Gender:</label>
              <select
                id="gender"
                name="gender"
                value={otherStaffData.gender}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="age" className="block font-medium">Age:</label>
              <input
                type="number"
                id="age"
                name="age"
                value={otherStaffData.age}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label htmlFor="username" className="block font-medium">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={otherStaffData.username}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

          

            <div>
              <label htmlFor="pwd" className="block font-medium">Password:</label>
              <input
                type="password"
                id="pwd"
                name="pwd"
                value={otherStaffData.pwd}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

<<<<<<< HEAD
          

            <div>
              <label htmlFor="pwd" className="block font-medium">Password:</label>
              <input
                type="password"
                id="pwd"
                name="pwd"
                value={otherStaffData.pwd}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

      
            <div>
              <label htmlFor="last_login" className="block font-medium">Last Login:</label>
              <input
                type="datetime-local"
                id="last_login"
                name="last_login"
                value={otherStaffData.last_login}
                onChange={handleChange}
                className="input-field"
              />
            </div>

=======
    

>>>>>>> ac572aa7f51ab17beb358ee39e9a2c33d16d92c9
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Register Staff</button>
          </form>
          {message && <p className="mt-4 text-red-500">{message}</p>}
        </section>
      </main>
    </div>
  );
};

export default RegisterOtherstaffPage;