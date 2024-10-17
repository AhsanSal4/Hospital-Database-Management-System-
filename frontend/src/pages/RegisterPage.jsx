import React from 'react';

const RegisterPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">

      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl mb-4 text-center">Register</h2>
        <form>
          <div className="mb-4">
            <label className="block mb-1">Full name:</label>
            <input type="text" className="w-full px-4 py-2 border rounded" />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Username:</label>
            <input type="text" className="w-full px-4 py-2 border rounded" />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Role:</label>
            <select className="w-full px-4 py-2 border rounded">
              <option>Doctor</option>
              <option>Receptionist</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password:</label>
            <input type="password" className="w-full px-4 py-2 border rounded" />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Confirm Password:</label>
            <input type="password" className="w-full px-4 py-2 border rounded" />
          </div>
          <button className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
