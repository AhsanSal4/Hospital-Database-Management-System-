import React from "react";
import { useNavigate } from "react-router-dom";

const ManageDoctor = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">Manage Doctors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full px-6 max-w-4xl">

        {/* Card 1: R View Patiens */}
        <div className="bg-white rounded-lg shadow-lg p-6 hover:scale-105 transition-transform duration-300 ease-in-out">
          <h2 className="text-xl font-semibold text-yellow-500">View all doctors</h2>
          <p className="text-gray-600 mt-2">View all doctors and their details.</p>
          <button
            onClick={() => navigate("/view-doctors")}
            className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
          >
            View doctors
          </button>
        </div>


        {/* Card 2: Update Patient Details */}
        <div className="bg-white rounded-lg shadow-lg p-6 hover:scale-105 transition-transform duration-300 ease-in-out">
          <h2 className="text-xl font-semibold text-cyan-500">Update Doctor Details</h2>
          <p className="text-gray-600 mt-2">Modify existing doctor information.</p>
          <button
            onClick={() => navigate("/update-doctor")}
            className="mt-4 bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
          >
            Update doctor
          </button>
        </div>

        {/* Card 3: Delete Patient */}
        <div className="bg-white rounded-lg shadow-lg p-6 hover:scale-105 transition-transform duration-300 ease-in-out">
          <h2 className="text-xl font-semibold text-red-500">Delete Doctor</h2>
          <p className="text-gray-600 mt-2">Remove a doctor from the database.</p>
          <button
            onClick={() => navigate("/delete-doctor")}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
          >
            Delete doctor
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageDoctor;
