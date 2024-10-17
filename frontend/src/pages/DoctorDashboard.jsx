import React from 'react';
import '../app.css'; // Import CSS file if needed

const DoctorDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
              {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-blue-400 text-white py-6 shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold">CityCare Hospital</h1>
          <p className="text-xl mt-2">Patient Information Page</p>
        </div>
      </header>
      {/* Main Content */}
      <main className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {/* Patient Analysis Section */}
        <section className="bg-white p-6 border border-gray-300 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-center">Patient Analysis</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="patientID" className="block font-medium">Patient ID:</label>
              <input
                type="text"
                id="patientID"
                className="input-field"
                required
              />
            </div>
            <div>
              <label htmlFor="analysisNotes" className="block font-medium">Analysis Notes:</label>
              <textarea
                id="analysisNotes"
                className="input-field h-24"
                required
              />
            </div>
            <button type="submit" className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
              Submit Analysis
            </button>
          </form>
        </section>

        {/* Prescribe Medicine Section */}
        <section className="bg-white p-6 border border-gray-300 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-center">Prescribe Medicine</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="prescriptionPatientID" className="block font-medium">Patient ID:</label>
              <input
                type="text"
                id="prescriptionPatientID"
                className="input-field"
                required
              />
            </div>
            <div>
              <label htmlFor="medicine" className="block font-medium">Medicine (comma separated):</label>
              <input
                type="text"
                id="medicine"
                className="input-field"
                required
              />
            </div>
            <div>
              <label htmlFor="dosage" className="block font-medium">Dosage Instructions:</label>
              <textarea
                id="dosage"
                className="input-field h-24"
                required
              />
            </div>
            <button type="submit" className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600">
              Prescribe Medicine
            </button>
          </form>
        </section>

        {/* Approve Bill Section */}
        <section className="bg-white p-6 border border-gray-300 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-center">Approve Bill</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="billPatientID" className="block font-medium">Patient ID:</label>
              <input
                type="text"
                id="billPatientID"
                className="input-field"
                required
              />
            </div>
            <div>
              <label htmlFor="billAmount" className="block font-medium">Bill Amount:</label>
              <input
                type="number"
                id="billAmount"
                className="input-field"
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
              Approve Bill
            </button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-500 text-white text-center py-4">
        <p>&copy; 2024 CityCare Hospital | Your health, our priority.</p>
      </footer>
    </div>
  );
};

export default DoctorDashboard;
