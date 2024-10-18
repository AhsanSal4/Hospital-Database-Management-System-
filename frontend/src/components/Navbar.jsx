import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-700 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl">CityCare Hospital</h1>
        <div>
      <Link to="/admin-dashboard">
      <button className="bg-white text-blue-700 px-4 py-2 rounded">Admin</button>
      </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
