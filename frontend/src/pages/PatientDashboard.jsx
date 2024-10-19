import React, { useEffect, useState } from 'react';

const PatientDashboard = () => {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Assuming the username is stored in localStorage after login
  const username = localStorage.getItem('username');  // Update this as per your app's login flow

  useEffect(() => {
    if (!username) {
      setError('No logged-in user found.');
      setLoading(false);
      return;
    }

    const fetchPatientData = async () => {
      try {
        const response = await fetch('http://localhost:5000/patient_dashboard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: username }), // Pass the actual username
        });

        const data = await response.json();

        if (data.success) {
          setPatientData(data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('An error occurred while fetching patient data.');
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [username]); // Re-run useEffect if username changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      {/* Render patientData */}
      <header className="bg-gradient-to-r from-blue-500 to-blue-400 text-white py-6 shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold">CityCare Hospital</h1>
          <p className="text-xl mt-2">Patient Information Page</p>
        </div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        <section className="bg-white p-4 border border-gray-300 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Patient Information</h2>
          <p><strong>ID:</strong> {patientData.patientID}</p>
          <p><strong>Full Name:</strong> {patientData.fullName}</p>
          <p><strong>Age:</strong> {patientData.age}</p>
          <p><strong>Gender:</strong> {patientData.gender}</p>
          <p><strong>Contact:</strong> {patientData.contactNumber}</p>
        </section>

        <section className="bg-white p-4 border border-gray-300 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Medical History</h2>
          <p><strong>Past Diseases:</strong> {patientData.pastDiseases}</p>
          <p><strong>Prescribed Medicines:</strong> {patientData.prescribedMedicines}</p>
        </section>

        <section className="bg-white p-4 border border-gray-300 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Current Treatment</h2>
          <p><strong>Attending Doctor:</strong> {patientData.attendingDoctor}</p>
        </section>

        <section className="bg-white p-4 border border-gray-300 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Bills</h2>
          <p><strong>Previous Bills:</strong> {patientData.bills.previousBills}</p>
          <p><strong>Current Bills:</strong> {patientData.bills.currentBills}</p>
        </section>
      </main>

      <footer className="bg-blue-500 text-white text-center py-4">
        <p>&copy; 2024 CityCare Hospital | Patient Portal</p>
      </footer>
    </div>
  );
};

export default PatientDashboard;
