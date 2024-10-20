import React, { useState } from 'react';

const GenerateBill = () => {
  const [patientId, setPatientId] = useState(''); // Patient ID input
  const [patientDetails, setPatientDetails] = useState(null); // To store patient details
  const [doctorDetails, setDoctorDetails] = useState(null); // To store doctor details
  const [billAmount, setBillAmount] = useState(null); // Final bill amount
  const [error, setError] = useState(''); // Error message

  // Function to fetch patient details
  const fetchPatientDetails = async () => {
    if (!patientId) {
      setError('Please enter a valid Patient ID');
      return; 
    }
    try {
      const response = await fetch(`http://localhost:5000/get-patient-details/${patientId}`);
      const data = await response.json();

      if (data.success) {
        setPatientDetails(data.patient); // Set patient details
        fetchDoctorDetails(data.patient.Dr_id, data.patient.Med_prescribed);  // Fetch doctor details and calculate bill
      } else {
        setError('Patient not found');
      }
    } catch (error) {
      console.error('Error fetching patient details:', error);
      setError('Error fetching patient details');
    }
  };

  // Function to fetch doctor details and calculate bill
  const fetchDoctorDetails = async (drId, medicines) => {
    try {
      const doctorResponse = await fetch(`http://localhost:5000/get-doctor-fee/${drId}`);
      const doctorData = await doctorResponse.json();
  
      if (doctorData.success) {
        const doctorFee = doctorData.doctor.fees;  // Corrected: Access `fees`, not `fee`
  
        const medicineCost = calculateMedicineCost(medicines); // Calculate medicine cost
        const totalBill = doctorFee + medicineCost; // Total bill is sum of doctor fee and medicine cost
  
        // Set doctor details and bill amount only if doctor data is valid
        setDoctorDetails({
          name: doctorData.doctor.Dr_name,
          fee: doctorData.doctor.fees, // Use `fees` instead of `fee`
        });
        setBillAmount(totalBill); // Set total bill amount
      } else {
        setError('Error fetching doctor details');
      }
    } catch (error) {
      console.error('Error fetching doctor details:', error);
      setError('Error fetching doctor details');
    }
  };
  
  // Function to calculate the total medicine cost (assuming you have a mapping of medicine prices)
  const calculateMedicineCost = (medicines) => {
    const medicinePrices = {
      "MedicineA": 50,  // Example price mapping
      "MedicineB": 100,
      "MedicineC": 150,
    };

    const prescribedMedicines = medicines.split(','); // Assuming comma-separated medicines
    let totalCost = 0;

    prescribedMedicines.forEach(med => {
      if (medicinePrices[med]) {
        totalCost += medicinePrices[med];
      }
    });

    return totalCost;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">Generate Bill</h1>

      {/* Patient ID Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Enter Patient ID"
          value={patientId}
          onChange={(e) => {
            setPatientId(e.target.value);
            setError(''); // Clear error when input changes
          }}
          className="p-2 border border-gray-300 rounded"
        />
        <button
          onClick={fetchPatientDetails}
          className="ml-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
        >
          Fetch Patient Details
        </button>
      </div>

      {/* Error Handling */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Patient Details */}
      {patientDetails && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-semibold text-blue-500">Patient Details</h2>
          <p><strong>Name:</strong> {patientDetails.P_name}</p>
          <p><strong>Gender:</strong> {patientDetails.Gender}</p>
          <p><strong>Age:</strong> {patientDetails.Age}</p>
          <p><strong>Height:</strong> {patientDetails.Height_cm} cm</p>
          <p><strong>Weight:</strong> {patientDetails.Weight_kg} kg</p>
          <p><strong>Admitted On:</strong> {patientDetails.Dt_admit}</p>
          <p><strong>Diseases:</strong> {patientDetails.Disease}</p>
          <p><strong>Prescribed Medicines:</strong> {patientDetails.Med_prescribed}</p>
          <p><strong>Doctor ID:</strong> {patientDetails.Dr_id}</p>
        </div>
      )}

      {/* Doctor Details and Bill */}
      {doctorDetails && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-semibold text-green-500">Doctor Details</h2>
          <p><strong>Doctor Name:</strong> {doctorDetails.name}</p>
          <p><strong>Doctor Fee:</strong> ${doctorDetails.fee}</p>
        </div>
      )}

      {/* Bill Details */}
      {billAmount !== null && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-green-500">Total Bill</h2>
          <p><strong>Doctor Fee:</strong> ${doctorDetails.fee}</p>
          <p><strong>Medicines Cost:</strong> ${calculateMedicineCost(patientDetails.Med_prescribed)}</p>
          <p className="text-2xl font-bold">Total Amount: ${billAmount}</p>
        </div>
      )}
    </div>
  );
};

export default GenerateBill;
