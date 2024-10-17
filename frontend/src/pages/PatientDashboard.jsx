import React from 'react';
import '../App.css';

const PatientDashboard = () => {
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
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {/* Patient Information */}
        <section className="bg-white p-4 border border-gray-300 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Patient Information</h2>
          <form className="space-y-3">
            <div>
              <label htmlFor="patientID" className="block font-medium">Patient ID:</label>
              <input type="text" id="patientID" className="input-field" required />
            </div>
            <div>
              <label htmlFor="patientName" className="block font-medium">Full Name:</label>
              <input type="text" id="patientName" className="input-field" required />
            </div>
            <div>
              <label htmlFor="age" className="block font-medium">Age:</label>
              <input type="number" id="age" className="input-field" required />
            </div>
            <div>
              <label htmlFor="gender" className="block font-medium">Gender:</label>
              <select id="gender" className="input-field" required>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="contact" className="block font-medium">Contact Number:</label>
              <input type="tel" id="contact" className="input-field" required />
            </div>
          </form>
        </section>

        {/* Medical History */}
        <section className="bg-white p-4 border border-gray-300 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Medical History</h2>
          <form className="space-y-3">
            <div>
              <label htmlFor="diseases" className="block font-medium">Past Diseases:</label>
              <textarea id="diseases" rows="3" className="input-field" required></textarea>
            </div>
            <div>
              <label htmlFor="allergies" className="block font-medium">Known Allergies:</label>
              <textarea id="allergies" rows="3" className="input-field" required></textarea>
            </div>
            <div>
              <label htmlFor="previousTreatments" className="block font-medium">Previous Treatments:</label>
              <textarea id="previousTreatments" rows="3" className="input-field" required></textarea>
            </div>
          </form>
        </section>

        {/* Current Treatment */}
        <section className="bg-white p-4 border border-gray-300 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Current Treatment</h2>
          <form className="space-y-3">
            <div>
              <label htmlFor="diagnosis" className="block font-medium">Current Diagnosis:</label>
              <textarea id="diagnosis" rows="3" className="input-field" required></textarea>
            </div>
            <div>
              <label htmlFor="medicines" className="block font-medium">Prescribed Medicines:</label>
              <textarea id="medicines" rows="3" className="input-field" required></textarea>
            </div>
            <div>
              <label htmlFor="attendingDoctor" className="block font-medium">Attending Doctor:</label>
              <input type="text" id="attendingDoctor" className="input-field" required />
            </div>
          </form>
        </section>

        {/* Emergency Contact */}
        <section className="bg-white p-4 border border-gray-300 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Emergency Contact</h2>
          <form className="space-y-3">
            <div>
              <label htmlFor="emergencyName" className="block font-medium">Contact Name:</label>
              <input type="text" id="emergencyName" className="input-field" required />
            </div>
            <div>
              <label htmlFor="emergencyPhone" className="block font-medium">Contact Phone Number:</label>
              <input type="tel" id="emergencyPhone" className="input-field" required />
            </div>
            <div>
              <label htmlFor="relation" className="block font-medium">Relation to Patient:</label>
              <input type="text" id="relation" className="input-field" required />
            </div>
          </form>
        </section>

        {/* Treatment Records */}
        <section className="bg-white p-4 border border-gray-300 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Treatment Records</h2>
          <form className="space-y-3">
            <div>
              <label htmlFor="records" className="block font-medium">Details of Treatment Records:</label>
              <textarea id="records" rows="4" className="input-field" required></textarea>
            </div>
          </form>
        </section>

        {/* Bills */}
        <section className="bg-white p-4 border border-gray-300 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Bills</h2>
          <form className="space-y-3">
            <div>
              <label htmlFor="previousBills" className="block font-medium">Previous Bills:</label>
              <textarea id="previousBills" rows="3" className="input-field" required></textarea>
            </div>
            <div>
              <label htmlFor="currentBills" className="block font-medium">Current Bills:</label>
              <textarea id="currentBills" rows="3" className="input-field" required></textarea>
            </div>
            <div>
              <label htmlFor="billPayments" className="block font-medium">Bill Payments:</label>
              <textarea id="billPayments" rows="3" className="input-field" required></textarea>
            </div>
          </form>
        </section>

        {/* View Reports */}
        <section className="bg-white p-4 border border-gray-300 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">View Reports</h2>
          <form className="space-y-3">
            <div>
              <label htmlFor="reports" className="block font-medium">Medical Reports:</label>
              <textarea id="reports" rows="4" className="input-field" required></textarea>
            </div>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-500 text-white text-center py-4">
        <p>&copy; 2024 CityCare Hospital | Patient Portal</p>
      </footer>
    </div>
  );
};

export default PatientDashboard;
