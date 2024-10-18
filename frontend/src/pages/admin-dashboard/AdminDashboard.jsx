import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
          CityCare Hospital Administration
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Manage Patients, Staff, and Services
        </p>

        {/* Dashboard Sections */}
        <div className="space-y-8">
          {/* Management Dashboard */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Management Dashboard
            </h2>
            <div className="grid grid-cols-1 p-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DashboardCard title="Patients" description="View, update, and manage patient records." link="/manage-patient" />
              <DashboardCard title="Doctors" description="View, update, and manage doctor profiles." link="/manage-doctor" />
              <DashboardCard title="Receptionists" description="View, update, and manage receptionist records." link="/manage-receptionist" />
              <DashboardCard title="Other staffs" description="View, update, and manage other staffs." link="/manage-otherstaff" />
            </div>
          </div>

          {/* New Registrations */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              New Registrations
            </h2>
            <div className="grid grid-cols-1 p-2 md:grid-cols-2 gap-6">
              <DashboardCard title="Register New Doctor/Receptionist" description="Register" link="/register" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Reusable Dashboard Card Component
const DashboardCard = ({ title, description,link }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
      <h3 className="text-xl font-semibold text-blue-600 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <Link to={link}>
      <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
        Manage {title}
      </button>
      </Link>
    </div>
  );
};

export default AdminDashboard;
