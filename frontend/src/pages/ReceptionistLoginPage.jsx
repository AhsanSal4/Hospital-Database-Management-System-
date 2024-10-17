import React from 'react';

const ReceptionistLoginPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">

      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl mb-4 text-center">Receptionist Login</h2>
        <form>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReceptionistLoginPage;
