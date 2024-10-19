import React, { useState } from 'react';

const RegisterMedicinePage = () => {
  const [medicineData, setMedicineData] = useState({
    m_id: '',
    m_name: '',
    price: '',
    disease: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicineData({ ...medicineData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/medicineregister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(medicineData),
      });

      if (response.ok) {
        setMessage('New medicine registered successfully!');
        setMedicineData({
          m_id: '',
          m_name: '',
          price: '',
          disease: ''
        });
      } else {
        const errorData = await response.json();
        setMessage(errorData.message);
      }
    } catch (error) {
      console.error('Error registering medicine:', error);
      setMessage('An error occurred while registering the medicine.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <header className="bg-gradient-to-r from-blue-500 to-blue-400 text-white py-6 shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold">CityCare Hospital</h1>
          <p className="text-xl mt-2">Register New Medicine</p>
        </div>
      </header>

      <main className="flex-grow flex justify-center items-center p-6">
        <section className="bg-white p-8 border border-gray-300 rounded-lg shadow-md w-full max-w-md">
          <form className="space-y-4" onSubmit={handleSubmit}>

            <div>
              <label htmlFor="m_name" className="block font-medium">Medicine Name:</label>
              <input
                type="text"
                id="m_name"
                name="m_name"
                value={medicineData.m_name}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label htmlFor="price" className="block font-medium">Price:</label>
              <input
                type="number"
                id="price"
                name="price"
                value={medicineData.price}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label htmlFor="disease" className="block font-medium">Disease:</label>
              <input
                type="text"
                id="disease"
                name="disease"
                value={medicineData.disease}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Register Medicine</button>
          </form>
          {message && <p className="mt-4 text-red-500">{message}</p>}
        </section>
      </main>
    </div>
  );
};

export default RegisterMedicinePage;
