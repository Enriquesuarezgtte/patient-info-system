import React, { useState } from 'react';
import ListPatients from './ListPatients'; // Import ListPatients component
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook


const Home = () => {
  const [formData, setFormData] = useState({
    doctorName: '',
    hospital: '',
    city: '',
    department: '',
    patientName: '',
    age: '',
    documentNumber: '',
    address: '',
    phoneNumber: '',
    weeksGestation: '',
    residencyStatus: '',
    numberOfPregnancies: '',
    conditions: {
      diabetes: false,
      hypertension: false,
      cholesterol: false,
      hiv: false,
      otherStis: false,
    },
  });
  const navigate = useNavigate(); // Get useNavigate hook
  const today = new Date().toISOString().slice(0, 10); // Get today's date (moved outside useEffect)

  const [isSubmitted, setIsSubmitted] = useState(false); // New state for submission status

  const handleChange = (event) => {
    const { name, type, checked } = event.target;
    console.log('Clicked checkbox:', name, checked);
    setFormData((prevData) => ({
      ...prevData,
      conditions: {
        ...prevData.conditions,
        [name.split('.')[1]]: checked,
      },
    }));
    // Check if any condition is true and log a warning (optional)
    if (Object.values(formData.conditions).some(condition => condition)) {
      console.warn('At least one medical condition is checked.');
    }
  };
  
  const handleChangeText = (event) => {
    const { name, type, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Dynamically update state property based on name
    }));
  };
  

  // Form submission logic (to be implemented)
  const handleSubmit = (event) => {
    event.preventDefault();
    const hasCheckedCondition = Object.values(formData.conditions).some(condition => condition);
  
    if (hasCheckedCondition) {
      if (window.confirm('Se requiere interconsulta con ginecóloga lo más pronto posible')) {
        console.log('Submitted new patient data (with medical conditions):', formData);
        // Submit form data (implementation here)
        formData.nextAppointment = 'Requerida lo más pronto posible'; // Medical condition message
        updatePatientsInLocalStorage(formData);
        navigate('/list-patients'); // Navigate to list patient page after submission

      } else {
        console.log('Submission cancelled due to medical conditions confirmation.');
      }
    } else {
      window.confirm('Siguiente cita será dentro de 6 meses');
      formData.nextAppointment = calculateNextAppointment(today, 6); // Calculate next appointment (3 months)

      // Submit form data (implementation here)
      updatePatientsInLocalStorage(formData);
      navigate('/list-patients'); // Navigate to list patient page after submission
    }
  };
  const calculateNextAppointment = (startDate, months) => {
    const newDate = new Date(startDate);
    newDate.setMonth(newDate.getMonth() + months);
    return newDate.toISOString().slice(0, 10);
  };
  
  const updatePatientsInLocalStorage = (newPatientData) => {
    const existingPatients = getPatientsFromLocalStorage(); // Get existing patients (explained later)
    const updatedPatients = [...existingPatients, newPatientData]; // Add new patient
    localStorage.setItem('savedPatientData', JSON.stringify(updatedPatients));
  };

  const getPatientsFromLocalStorage = () => {
    const savedData = JSON.parse(localStorage.getItem('savedPatientData'));
    return savedData || []; // Return empty array if no data exists
  };

  return (
    <div className="new-patient-container">
      <h2>Crear Nuevo Paciente</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="doctorName">Nombre del Médico:</label>
          <input
            type="text"
            id="doctorName"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChangeText}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="hospital">Hospital:</label>
          <input
            type="text"
            id="hospital"
            name="hospital"
            value={formData.hospital}
            onChange={handleChangeText}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">Ciudad:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChangeText}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="department">Departamento:</label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChangeText}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="patientName">Nombre del Paciente:</label>
          <input
            type="text"
            id="patientName"
            name="patientName"
            value={formData.patientName}
            onChange={handleChangeText}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Edad:</label>
          <input
            type="number" // Specify number input type
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChangeText}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="documentNumber">Número de Documento:</label>
          <input
            type="text"
            id="documentNumber"
            name="documentNumber"
            value={formData.documentNumber}
            onChange={handleChangeText}
            required
          />
         </div>
        <div className="form-group">
          <label htmlFor="address">Dirección:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChangeText}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Teléfono:</label>
          <input
            type="tel" // Specify phone number input type
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChangeText}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="weeksGestation">Semanas de Gestación:</label>
          <input
            type="number" // Specify number input type
            id="weeksGestation"
            name="weeksGestation"
            value={formData.weeksGestation}
            onChange={handleChangeText}
          />
        </div>
        <div className="form-group">
          <label>Residencia:</label>
          <div className="radio-buttons">
            <label htmlFor="residencyStatusRural">
              <input
                type="radio"
                id="residencyStatusRural"
                name="residencyStatus"
                value="Rural"
                checked={formData.residencyStatus === 'Rural'}
                onChange={handleChangeText}
              />
              Rural
            </label>
            <label htmlFor="residencyStatusUrban">
              <input
                type="radio"
                id="residencyStatusUrban"
                name="residencyStatus"
                value="Urban"
                checked={formData.residencyStatus === 'Urban'}
                onChange={handleChangeText}
              />
              Urbano
            </label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="numberOfPregnancies">Número de Embarazos:</label>
          <input
            type="number" // Specify number input type
            id="numberOfPregnancies"
            name="numberOfPregnancies"
            value={formData.numberOfPregnancies}
            onChange={handleChangeText}
          />
        </div>
        <div className="form-group">
          <h4>Condiciones Médicas:</h4>
          <div className="checkbox-container">
            <label htmlFor="diabetes">
              <input
                type="checkbox"
                id="diabetes"
                name="conditions.diabetes" // Update name for state access
                checked={formData.conditions.diabetes}
                onChange={handleChange}
              />
              Diabetes
            </label>
            <label htmlFor="hypertension">
              <input
                type="checkbox"
                id="hypertension"
                name="conditions.hypertension" // Update name for state access
                checked={formData.conditions.hypertension}
                onChange={handleChange}
              />
              Hipertensión
            </label>
            <label htmlFor="cholesterol">
              <input
                type="checkbox"
                id="cholesterol"
                name="conditions.cholesterol" // Update name for state access
                checked={formData.conditions.cholesterol}
                onChange={handleChange}
              />
              Colesterol
            </label>
            <label htmlFor="hiv">
              <input
                type="checkbox"
                id="hiv"
                name="conditions.hiv" // Update name for state access
                checked={formData.conditions.hiv}
                onChange={handleChange}
              />
              VIH
            </label>
            <label htmlFor="otherStis">
              <input
                type="checkbox"
                id="otherStis"
                name="conditions.otherStis" // Update name for state access
                checked={formData.conditions.otherStis}
                onChange={handleChange}
              />
              Otras ETS
            </label>
          </div>
        </div>
        {/* Remaining form fields will be added here */}
        <button type="submit">Crear Paciente</button>
      </form>
      {isSubmitted && <ListPatients patients={[formData]} />} {/* Assuming only one patient */}
    </div>
  );
};

export default Home;
