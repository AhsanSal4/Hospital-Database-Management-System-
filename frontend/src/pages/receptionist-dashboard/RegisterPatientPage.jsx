import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal"; // Make sure the path is correct

const RegisterPatientPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        height: "",
        weight: "",
        gender: "",
        age: "",
        dateOfAdmit: "",
        disease: "",
        medicine: "",
        username: "",
        password: "",
        dr_id: "",  // Added dr_id field
    });

    const [doctors, setDoctors] = useState([]); // State to hold doctors
    const [loadingDoctors, setLoadingDoctors] = useState(true); // Loading state for doctors
    const [modalMessage, setModalMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Fetch doctors from the backend
        const fetchDoctors = async () => {
            try {
                const response = await fetch("http://localhost:5000/display_doctor_spec"); // Update this URL based on your backend
                const data = await response.json();
                setDoctors(data); // Assuming the response is an array of doctors
            } catch (error) {
                console.error("Error fetching doctors:", error);
            } finally {
                setLoadingDoctors(false);
            }
        };

        fetchDoctors();
    }, []); // Empty dependency array means this runs once on mount

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData); // Check the form data before sending

        // Make POST request to Flask backend
        fetch("http://localhost:5000/add_patient", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                patient_name: formData.name,
                mobile_no: formData.phone,
                gender: formData.gender,
                age: formData.age,
                height_cm: formData.height,
                weight_kg: formData.weight,
                date_admit: formData.dateOfAdmit,
                symptom: formData.disease,
                med_prescribed: formData.medicine,
                username: formData.username,
                password: formData.password,
                dr_id: formData.dr_id,  // Sending dr_id to the backend
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                setModalMessage("Error: " + data.error);
            } else {
                setModalMessage("Patient Registered Successfully!");
                // Clear the form if needed
                setFormData({
                    name: "",
                    phone: "",
                    height: "",
                    weight: "",
                    gender: "",
                    age: "",
                    dateOfAdmit: "",
                    disease: "",
                    medicine: "",
                    username: "",
                    password: "",
                    dr_id: "",  // Clear dr_id field as well
                });
            }
            setIsModalOpen(true); // Open the modal
        })
        .catch((error) => {
            console.error("Error:", error);
            setModalMessage("Error: " + error.message);
            setIsModalOpen(true); // Open the modal
        });
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <h1 className="text-3xl font-bold mb-8 text-blue-600">Register New Patient</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Phone Number:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="flex space-x-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Height (cm):</label>
                        <input
                            type="number"
                            name="height"
                            value={formData.height}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Weight (kg):</label>
                        <input
                            type="number"
                            name="weight"
                            value={formData.weight}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Gender:</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Age:</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Date of Admit:</label>
                    <input
                        type="date"
                        name="dateOfAdmit"
                        value={formData.dateOfAdmit}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Disease:</label>
                    <input
                        type="text"
                        name="disease"
                        value={formData.disease}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Doctor:</label>
                    {loadingDoctors ? (
                        <select className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500" disabled>
                            <option>Loading doctors...</option>
                        </select>
                    ) : (
                        <select
                            name="dr_id"
                            value={formData.dr_id}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                            required
                        >
                            <option value="">Select Doctor</option>
                            {doctors.map((doctor) => (
                                <option key={doctor.dr_id} value={doctor.dr_id}>
                                    {doctor.dr_id} - {doctor.specialization}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                <div className="flex space-x-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                >
                    Register Patient
                </button>
            </form>
            {isModalOpen && <Modal message={modalMessage} onClose={closeModal} />}
        </div>
    );
};

export default RegisterPatientPage;
