import React, { useState } from 'react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    mobile_no: '',
    role: 'DOCTOR', // Default value for role
    password: '',
    confirmPassword: '',
    gender: 'MALE', // Default value for gender
    specialisation: '',
    working_hrs: '',  // New field
    age: '',
    salary: '',
    fees: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    // Simple client-side validation
    if (formData.password !== formData.confirmPassword) {
       alert('Passwords do not match');
       return;
    }
 
    const url = formData.role === 'DOCTOR' ? 'http://localhost:5000/Hire_Doctor' : 'http://localhost:5000/Add_Recept'; 
 
    try {
       const response = await fetch(url, {
          method: 'POST',
          headers: {
             'Content-Type': 'application/json',
          },
          body: JSON.stringify({
             fullName: formData.fullName,
             username: formData.username,
             mobile_no: formData.mobile_no,
             password: formData.password,
             gender: formData.gender,
             specialisation: formData.role === 'DOCTOR' ? formData.specialisation : undefined, // Only include if role is Doctor
             working_hrs: formData.working_hrs,  // New field
             age: formData.age,
             salary: formData.salary,
             fees: formData.role === 'DOCTOR' ? formData.fees : undefined, // Only include if role is Doctor
          }),
       });
 
       // Check if response is OK (status code 200–299)
       if (response.ok) {
          const result = await response.json(); // This may fail if the response is empty
          alert('Registration successful');
       } else {
          const errorText = await response.text();  // Read response as text for non-200 statuses
          alert(`Error: ${errorText}`);
       }
    } catch (error) {
       console.error('Error:', error);
       alert('An error occurred during registration.');
    }
 };
 
  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl mb-4 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Full name:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Mobile Number:</label>
            <input
              type="text"
              name="mobile_no"
              value={formData.mobile_no}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Role:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            >
              <option value="DOCTOR">Doctor</option>
              <option value="RECEPTIONIST">Receptionist</option>
            </select>
          </div>
          {/* Conditional Rendering for Specialisation and Consultation Fees */}
          {formData.role === 'DOCTOR' && (
            <>
              <div className="mb-4">
                <label className="block mb-1">Specialisation:</label>
                <input
                  type="text"
                  name="specialisation"
                  value={formData.specialisation}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Consultation Fees:</label>
                <input
                  type="number"
                  name="fees"
                  value={formData.fees}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
            </>
          )}
          <div className="mb-4">
            <label className="block mb-1">Working Hours:</label>
            <input
              type="text"
              name="working_hrs"
              value={formData.working_hrs}  // New field
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Salary:</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
