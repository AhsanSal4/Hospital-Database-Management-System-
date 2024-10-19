import React, { useEffect, useState } from 'react';
const ViewMedicinesPage = () =>{
    const[medicine,setMedicines]=useState([])
    useEffect(() => {
        const fetchMedicines = async () => {
          try {
            const response = await fetch('http://localhost:5000/display_all_medicines'); // Adjust the backend URL as needed
            const data = await response.json();
            setMedicines(data);
          } catch (error) {
            console.error('Error fetching medicines:', error);
          }
        };
      
        fetchMedicines();
    }, []);
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
          <h1 className="text-3xl font-bold mb-8 text-blue-600">View Medicines</h1>
    
          <div className="overflow-x-auto w-full max-w-6xl">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left"> Med ID</th>
                  <th className="py-2 px-4 text-left">Price</th>
                  <th className="py-2 px-4 text-left">Disease</th>  
                </tr>
              </thead>
              <tbody>
                {medicine.length > 0 ? (
                  medicine.map((med, index) => (
                    <tr
                      key={index}
                      className="hover:bg-blue-100 transition-colors duration-300"
                    >
                      <td className="py-2 px-4 border-b border-gray-200">{med.M_name}</td>
                      <td className="py-2 px-4 border-b border-gray-200">{med.M_id}</td>
                      <td className="py-2 px-4 border-b border-gray-200">{med.price}</td>
                      <td className="py-2 px-4 border-b border-gray-200">{med.Disease}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="py-4 text-center text-gray-500">
                      No medicines found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
    );
};
   
export default ViewMedicinesPage;