import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../app.css"; // Import CSS file if needed

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicines, setSelectedMedicines] = useState([]); // Store selected medicines
  const [medicineTotalPrice, setMedicineTotalPrice] = useState(0);
  const [doctorFee, setDoctorFee] = useState(0);
  const [gst, setGst] = useState(0.18); // 18% GST
  const [totalBill, setTotalBill] = useState(0); // New state for total bill
  const [error, setError] = useState(null);
  const [doctorDetails, setDoctorDetails] = useState(null);

  // Fetch doctor details
  const fetchDoctorDetails = async () => {
    const doctorUsername = localStorage.getItem("username");
    if (!doctorUsername) {
      setError("Doctor username is not available");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/doctor_dash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: doctorUsername }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to fetch doctor details");
        return;
      }

      const data = await response.json();
      setDoctorDetails(data);
    } catch (error) {
      console.error("Error fetching doctor details:", error);
      setError(error.message);
    }
  };

  // Fetch patients and medicines when component mounts
  const fetchPatients = async () => {
    const doctorUsername = localStorage.getItem("username");
    if (!doctorUsername) {
      setError("Doctor username is not available");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/get_patients/${doctorUsername}`);
      const data = await response.json();
      if (data.patients) {
        setPatients(data.patients);
      } else {
        setError("No patients found or invalid response");
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
      setError(error.message);
    }
  };

  const fetchMedicines = async () => {
    try {
      const response = await fetch("http://localhost:5000/get_medicines");
      const data = await response.json();
      if (data.medicines) {
        setMedicines(data.medicines);
      } else {
        setError("No medicines found or invalid response");
      }
    } catch (error) {
      console.error("Error fetching medicines:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchDoctorDetails();
    fetchPatients();
    fetchMedicines();
  }, []);

  const handlePatientSelect = (e) => {
    const patientId = e.target.value;
    const patient = patients.find((p) => p.P_id === patientId);
    setSelectedPatient(patient);
    setDoctorFee(0);  // Reset doctor fee on patient change
    setMedicineTotalPrice(0);  // Reset medicine total price
    setTotalBill(0); // Reset total bill
  };

  const handleSubmitAnalysis = async (e) => {
    e.preventDefault();
    const analysisNotes = e.target.analysisNotes.value;

    if (!selectedPatient || !analysisNotes) {
      return alert("Please select a patient and provide analysis notes.");
    }

    const response = await fetch("http://localhost:5000/submit_analysis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        patientID: selectedPatient.P_id,
        analysisNotes,
      }),
    });

    const data = await response.json();
    if (data.message) {
      alert("Analysis submitted successfully");
    } else {
      alert("Failed to submit analysis");
    }
  };

  // Handle prescribing medicine and billing calculation
  const handlePrescribeMedicine = async (e) => {
    e.preventDefault();

    if (!selectedPatient || selectedMedicines.length === 0) {
      return alert("Please select a patient and prescribe at least one medicine.");
    }

    const response = await fetch("http://localhost:5000/prescribe_medicine", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        patientID: selectedPatient.P_id,
        medicines: selectedMedicines,
      }),
    });

    const data = await response.json();
    if (data.message) {
      alert("Medicines prescribed successfully");
      const { doctor_fee, medicines, total_bill, gst } = data;
      setDoctorFee(doctor_fee);
      setMedicineTotalPrice(
        medicines.reduce((total, medicine) => total + medicine.price, 0)
      );
      setTotalBill(total_bill); // Set the total bill after calculating GST
    } else {
      alert("Failed to prescribe medicines");
    }
  };

  const handleApproveBill = async (e) => {
    e.preventDefault();
    const billAmount = e.target.billAmount.value;

    if (!selectedPatient || !billAmount) {
        return alert("Please select a patient and provide bill amount.");
    }

    const response = await fetch("http://localhost:5000/approve_bill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            patientID: selectedPatient.P_id,
            billAmount, // This is correctly sent
        }),
    });

    const data = await response.json();
    if (data.message) {
        alert("Bill approved successfully");
    } else {
        alert("Failed to approve bill");
    }
  };

  // Handle multiple medicines selection and update the total price
  const handleMedicineSelect = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedMedicines(selectedValues);

    const total = selectedValues.reduce((sum, medicineId) => {
      const medicine = medicines.find((med) => med.M_id === medicineId);
      return sum + (medicine ? medicine.price : 0);
    }, 0);
    setMedicineTotalPrice(total);
  };

  const calculateTotalBill = () => {
    const total = doctorFee + medicineTotalPrice;
    const gstAmount = total * gst;
    return total + gstAmount; // Total bill including GST
  };

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!patients.length) {
    return <div className="text-gray-500 text-center">No patients available or loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-blue-400 text-white py-6 shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold">CityCare Hospital</h1>
          <p className="text-xl mt-2">Doctor Dashboard</p>
        </div>
      </header>

      {doctorDetails && (
        <div className="text-center">
          <h3 className="text-xl font-semibold">Welcome, Dr. {doctorDetails.dr_name}</h3>
          <p className="text-lg">Specialization: {doctorDetails.specialization}</p>
        </div>
      )}

      <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-md mx-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-center">Select a Patient</h2>
        <select
          id="patientDropdown"
          className="block w-full border border-gray-300 p-2 rounded mb-4"
          onChange={handlePatientSelect}
        >
          <option value="">-- Select Patient --</option>
          {patients.map((patient) => (
            <option key={patient.P_id} value={patient.P_id}>
              {patient.P_name}
            </option>
          ))}
        </select>
      </div>

      {/* Patient Details */}
      {selectedPatient && (
        <div className="text-center">
          <h3 className="text-xl font-semibold">Selected Patient: {selectedPatient.P_name}</h3>
          <p className="text-lg">ID : {selectedPatient.P_id} ,Age: {selectedPatient.Age}, Gender: {selectedPatient.Gender} , Disease: {selectedPatient.Disease}</p>
          <button
            onClick={() => navigate("/update-patient-Doc", { state: { patientID: selectedPatient?.P_id } })}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
          >
            Update Disease
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {/* Patient Analysis Section */}
        <section className="bg-white p-6 border border-gray-300 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Submit Patient Analysis</h2>
          <form onSubmit={handleSubmitAnalysis}>
            <textarea
              name="analysisNotes"
              id="analysisNotes"
              className="block w-full h-32 border border-gray-300 p-2 rounded mb-4"
              placeholder="Enter patient analysis notes here"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
            >
              Submit Analysis
            </button>
          </form>
        </section>

        {/* Prescription Section */}
        <section className="bg-white p-6 border border-gray-300 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Prescribe Medicine</h2>
          <form onSubmit={handlePrescribeMedicine}>
            <select
              multiple
              name="medicines"
              id="medicineSelect"
              className="block w-full border border-gray-300 p-2 rounded mb-4"
              onChange={handleMedicineSelect}
            >
              {medicines.map((medicine) => (
                <option key={medicine.M_id} value={medicine.M_id}>
                  {medicine.M_name} - ₹{medicine.price}
                </option>
              ))}
            </select>
            <p className="text-lg font-semibold mb-2">
              Medicine Total: ₹{medicineTotalPrice.toFixed(2)}
            </p>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
            >
              Prescribe Medicines
            </button>
          </form>
        </section>

        {/* Approve Bill Section */}
        <section className="bg-white p-6 border border-gray-300 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Approve Bill</h2>
          <form onSubmit={handleApproveBill}>
            <p className="text-lg font-semibold mb-2">Doctor Fee: ₹{doctorFee}</p>
            <p className="text-lg font-semibold mb-2">
              Medicine Total: ₹{medicineTotalPrice.toFixed(2)}
            </p>
            <p className="text-lg font-semibold mb-2">GST: 18%</p>
            <p className="text-lg font-semibold mb-4">
              Total Bill (incl. GST): ₹{calculateTotalBill().toFixed(2)}
            </p>
            <input
              type="hidden"
              name="billAmount"
              value={calculateTotalBill().toFixed(2)}
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
            >
              Approve Bill
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default DoctorDashboard;
