import React from 'react';

const LoginPage = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-md rounded-lg p-8 max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Doctor Login</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Username</label>
            <input type="text" className="w-full px-3 py-2 border rounded-md focus:outline-none" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input type="password" className="w-full px-3 py-2 border rounded-md focus:outline-none" />
          </div>
          <button className="bg-blue-600 text-white w-full py-2 rounded-md">Login</button>
          <p className="text-sm mt-4 text-center">Don't have an account? <a href="/register" className="text-blue-600">Register</a></p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
