import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaParking } from 'react-icons/fa'; // Parking icon

const Navbar = () => {
  const [filledSlots, setFilledSlots] = useState(0); // Store filled slots
  const totalSlots = 500; // Total parking slots
  const availableSlots = totalSlots - filledSlots; // Calculate available slots

  // Fetch filled parking slots from the backend
  const fetchParkingData = async () => {
    try {
      const response = await fetch('http://localhost:5000/get_filled_slots'); // Backend URL
      const data = await response.json();
      if (data.filledSlots !== undefined) {
        setFilledSlots(data.filledSlots);
      } else {
        console.error('Error fetching parking data');
      }
    } catch (error) {
      console.error('Error fetching parking data:', error);
    }
  };

  useEffect(() => {
    fetchParkingData(); // Fetch data on component mount
  }, []);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-900 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-3xl font-semibold tracking-wider">
          CityCare Hospital
        </h1>

        <div className="flex items-center space-x-6">
          {/* Display Parking Details */}
          <div className="flex items-center space-x-2 bg-white text-blue-900 px-4 py-2 rounded-lg shadow hover:bg-blue-50 transition duration-300">
            <FaParking className="text-blue-700 text-lg" /><b>Parking Details:</b> {/* Parking icon */}
            <p className="text-sm font-medium">
              <span className="font-semibold">{filledSlots}</span> filled,
              <span className="font-semibold"> {availableSlots}</span> available
            </p>
          </div>

          {/* Admin Button */}
          <Link to="/admin-login">
            <button className="bg-gradient-to-r from-green-500 to-green-700 text-white px-5 py-2 rounded-full font-bold shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
              Admin
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
