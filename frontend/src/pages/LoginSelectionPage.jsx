import React from 'react';
import { Link } from 'react-router-dom';

const LoginSelectionPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">

      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl text-red-500 mb-4 text-center">Login Selection</h2>
        <div className="space-y-7">
          <Link to="/login-doctor">
            <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              Login as Doctor
            </button>
          </Link>
          <Link to="/login-receptionist">
            <button className="w-full bg-blue-500 text-white px-4 py-2 my-4 rounded hover:bg-blue-700">
              Login as Receptionist
            </button>
          </Link>
          <Link to="/login-patient">
            <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              Login as Patient
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginSelectionPage;
