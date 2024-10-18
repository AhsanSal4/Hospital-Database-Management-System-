import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content - Use flex-grow to take up remaining space */}
      <div className="flex flex-col justify-center items-center flex-grow bg-blue-100">
        <h1 className="text-4xl mb-8">Hospital Administration Portal</h1>
        <p className="mb-4 text-center">Manage hospital staff, patient records, and appointments efficiently.</p>
        <div className="flex space-x-4">
          <Link to="/login-selection">
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              Register
            </button>
          </Link>
        </div>

        {/* Parking Information Section */}
        <div className="bg-white shadow-md rounded-lg p-8 mt-12 w-11/12 md:w-3/4 lg:w-2/3">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Parking Information</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-800">
            <li>
              <strong>Visitor Parking:</strong> Available near the main entrance with easy access to the hospital reception.
            </li>
            <li>
              <strong>Staff Parking:</strong> Reserved parking for hospital staff with entry from the rear gate.
            </li>
            <li>
              <strong>Handicap Parking:</strong> Dedicated spots are available near the entrance for disabled patients and visitors.
            </li>
            <li>
              Parking is available <strong>24/7</strong> with security patrols to ensure safety.
            </li>
            <li>
              Please ensure you park in designated areas to avoid inconvenience.
            </li>
          </ul>
          <p className="mt-4 text-gray-600 text-sm">Our parking lot is located at the north side of the hospital building, with separate sections for staff and visitors.</p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
