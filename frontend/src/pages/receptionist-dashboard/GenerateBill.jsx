import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import hospitalLogo from '/logo.jpg'; // Assuming logo is placed in the public folder

const GenerateBill = () => {
  const [patientId, setPatientId] = useState('');
  const [patientDetails, setPatientDetails] = useState(null);
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [error, setError] = useState('');

  const fetchPatientDetails = async () => {
    if (!patientId) {
      setError('Please enter a valid Patient ID');
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/get-patient-details/${patientId}`);
      const data = await response.json();
      if (data.success) {
        setPatientDetails(data.patient);
        fetchDoctorDetails(data.patient.Dr_id);
      } else {
        setError('Patient not found');
      }
    } catch (error) {
      console.error('Error fetching patient details:', error);
      setError('Error fetching patient details');
    }
  };

  const fetchDoctorDetails = async (drId) => {
    try {
      const doctorResponse = await fetch(`http://localhost:5000/get-doctor-fee/${drId}`);
      const doctorData = await doctorResponse.json();
      if (doctorData.success) {
        setDoctorDetails({
          name: doctorData.doctor.Dr_name,
          fee: doctorData.doctor.fees,
        });
      } else {
        setError('Error fetching doctor details');
      }
    } catch (error) {
      console.error('Error fetching doctor details:', error);
      setError('Error fetching doctor details');
    }
  };

  // Function to download the bill as a PDF
  // Function to download the bill as a PDF
// Function to download the bill as a PDF
const downloadBillAsPDF = () => {
  if (patientDetails && doctorDetails) {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Add hospital logo
    pdf.addImage(hospitalLogo, 'PNG', pageWidth / 2 - 20, 10, 40, 20);

    // Title and hospital information
    pdf.setFontSize(26);
    pdf.setTextColor(0, 51, 102); // Dark navy blue for the title
    pdf.text('CityCare Hospital', pageWidth / 2, 40, { align: 'center' });
    pdf.setFontSize(12);
    pdf.setTextColor(100);
    pdf.text('Near MACE MEN\'s Hostel, Kothamangalam, Kerala', pageWidth / 2, 48, { align: 'center' });
    pdf.text('Contact: +91 9074938234 | Email: citycarehospital@gmail.com', pageWidth / 2, 54, { align: 'center' });

    // Add a thematic line separator
    pdf.setDrawColor(0, 51, 102); // Dark navy blue
    pdf.line(15, 60, pageWidth - 15, 60); // Blue horizontal line

    // Patient Details Section
    pdf.setFontSize(16);
    pdf.setTextColor(255); // White for section headers
    pdf.setFillColor(0, 102, 204); // Light blue background for the header
    pdf.rect(10, 65, pageWidth - 20, 10, 'F'); // Header background

    pdf.text('Patient Details', 15, 73);
    pdf.setFontSize(12);
    pdf.setTextColor(0);
    pdf.setFillColor(255); // White for details background
    pdf.rect(10, 75, pageWidth - 20, 55, 'F'); // Details background
    pdf.setTextColor(0); // Reset text color to black

    pdf.text(`Name: ${patientDetails.P_name}`, 15, 80);
    pdf.text(`Age: ${patientDetails.Age}`, 15, 86);
    pdf.text(`Gender: ${patientDetails.Gender}`, 15, 92);
    pdf.text(`Admitted On: ${patientDetails.Dt_admit}`, 15, 98);
    pdf.text(`Prescribed Medicines: ${patientDetails.Med_prescribed}`, 15, 104);

    // Doctor Details Section
    pdf.setFontSize(16);
    pdf.setTextColor(255); // White for section headers
    pdf.setFillColor(0, 102, 204); // Light blue background for the header
    pdf.rect(10, 135, pageWidth - 20, 10, 'F'); // Header background

    pdf.text('Doctor Details', 15, 143);
    pdf.setFontSize(12);
    pdf.setTextColor(0);
    pdf.setFillColor(255); // White for details background
    pdf.rect(10, 145, pageWidth - 20, 30, 'F'); // Details background
    pdf.setTextColor(0); // Reset text color to black

    pdf.text(`Doctor: ${doctorDetails.name}`, 15, 150);
    pdf.text(`Doctor's Fee: ${doctorDetails.fee} Rupees`, 15, 156);

    // Billing Section
    const medicineCharge = patientDetails.Bill;
    const gstAmount = (medicineCharge * 0.18).toFixed(2);
    const totalAmount = (medicineCharge * 1.18).toFixed(2);

    pdf.setFontSize(16);
    pdf.setTextColor(255); // White for section headers
    pdf.setFillColor(0, 102, 204); // Light blue background for the header
    pdf.rect(10, 185, pageWidth - 20, 10, 'F'); // Header background

    pdf.text('Billing Details', 15, 193);
    pdf.setFontSize(12);
    pdf.setTextColor(0);
    pdf.setFillColor(255); // White for details background
    pdf.rect(10, 195, pageWidth - 20, 50, 'F'); // Details background
    pdf.setTextColor(0); // Reset text color to black

    pdf.text(`Doctor's Fee: ${doctorDetails.fee} Rupees`, 15, 205);
    pdf.text(`Medicine Charges: ${medicineCharge} Rupees`, 15, 211);
    pdf.text(`GST (18%): ${gstAmount} Rupees`, 15, 217);
    pdf.setFontSize(14);
    pdf.setTextColor(255, 87, 34); // Orange for total amount
    pdf.text(`Total Bill: ${totalAmount} Rupees Only`, 15, 227);

    // Add another line separator before the footer
    pdf.setDrawColor(0, 51, 102);
    pdf.line(15, pageHeight - 30, pageWidth - 15, pageHeight - 30);

    // Footer section
    pdf.setFontSize(10);
    pdf.setTextColor(100);
    pdf.text('Thank you for your visit!', pageWidth / 2, pageHeight - 20, { align: 'center' });

    // Save PDF
    pdf.save(`Bill_${patientDetails.P_name}_${new Date().toLocaleDateString()}.pdf`);
  }
};



  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-green-200 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">Generate Patient Bill</h1>

      <div className="mb-6 flex flex-row items-center">
        <input
          type="text"
          placeholder="Enter Patient ID"
          value={patientId}
          onChange={(e) => {
            setPatientId(e.target.value);
            setError('');
          }}
          className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-2/4"
        />
        <button
          onClick={fetchPatientDetails}
          className="ml-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out"
        >
          Fetch Details
        </button>
      </div>

      {error && <div className="text-red-500 mb-8">{error}</div>}

      <div className="flex justify-between w-3/4 mb-8">
        {patientDetails && (
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 m-2">
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">Patient Details</h2>
            <p><strong>Name:</strong> {patientDetails.P_name}</p>
            <p><strong>Gender:</strong> {patientDetails.Gender}</p>
            <p><strong>Age:</strong> {patientDetails.Age}</p>
            <p><strong>Admitted On:</strong> {patientDetails.Dt_admit}</p>
            <p><strong>Prescribed Medicines:</strong> {patientDetails.Med_prescribed}</p>
            <p><strong>Doctor ID:</strong> {patientDetails.Dr_id}</p>
          </div>
        )}

        {doctorDetails && (
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 m-2">
            <h2 className="text-2xl font-semibold text-green-500 mb-4">Doctor Details</h2>
            <p><strong>Name:</strong> {doctorDetails.name}</p>
            <p><strong>Fee:</strong> ₹{doctorDetails.fee}</p>
          </div>
        )}

        {patientDetails && patientDetails.Bill !== null && (
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 m-2">
            <h2 className="text-2xl font-semibold text-green-500 mb-4">Billing</h2>
            <p><strong>Total Bill:</strong> ₹{(patientDetails.Bill * 1.18).toFixed(2)}</p>
          </div>
        )}
      </div>

      {patientDetails && patientDetails.Bill !== null && (
        <button
          onClick={downloadBillAsPDF}
          className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out"
        >
          Download Bill as PDF
        </button>
      )}
    </div>
  );
};

export default GenerateBill;
