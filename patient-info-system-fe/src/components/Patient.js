import React from 'react';

const Patient = ({ patientData }) => {
  const hasConditions = patientData.medicalConditions && patientData.medicalConditions.length > 0;

  return (
    <div className="patient-item">
      <p>Nombre: {patientData.patientName}</p>
      <p>Identificacion: {patientData.documentNumber}</p>
      <p>Alerta: {patientData.date || patientData.timestamp}</p>  {/* Display date or timestamp if available */}
      {hasConditions ? (
        <span className="medical-conditions">
          <i className="fas fa-check-circle"></i> Tiene condiciones médicas
        </span>
      ) : (
        <span className="medical-conditions">
          <i className="fas fa-times-circle"></i> Sin condiciones médicas
        </span>
      )}
            <p>Próxima cita: {patientData.nextAppointment}</p>

    </div>
  );
};

export default Patient;
