import React, { useState, useEffect } from 'react';
import Patient from './Patient'; // Import Patient component

const ListPatients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('savedPatientData'));
    if (savedData) {
      if (Array.isArray(savedData)) {
        setPatients(savedData); // Set patients state with the entire list
      } else {
        // Handle potential case of non-array data (optional)
      }
    }
  }, []);

  return (
    <div className="list-patients">
        <a href="home.html" class="home-btn">Home</a>

      <h2>Lista de Pacientes</h2>
      {patients.length > 0 ? (
        <ul>
          {patients.map((patient) => (
            <li key={patient.id}>
              <Patient patientData={patient} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron pacientes.</p>
      )}
    </div>
  );
};

export default ListPatients;
