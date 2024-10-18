import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Check credentials against your backend
    try {
      const response = await fetch('http://localhost:5000/login_pa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        // If login is successful, navigate to the doctor dashboard
        navigate('/doctor-dashboard');
      } else {
        // Handle login error (e.g., display a message)
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl mb-4 text-center">Doctor Login</h2>
        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 border border-gray-300 rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded-md">Login</button>
          </div>
        </form>
        <p className="text-sm mt-4 text-center">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-600 underline">Register</a>
        </p>
      </div>
    </div>
  );
};

export default DoctorLoginPage;
