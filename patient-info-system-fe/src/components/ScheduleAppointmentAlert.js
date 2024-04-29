import React from 'react';

const ScheduleAppointmentAlert = ({ onConfirm, onCancel }) => {
    return (
      <div className="schedule-appointment-alert">
        {/* Message and link here */}
        <button onClick={() => {
          console.log('Confirm button clicked');
          onConfirm();
        }}>
          Submit Anyway
        </button>
        <button onClick={() => {
          console.log('Cancel button clicked');
          onCancel();
        }}>
          Cancel Submission
        </button>
      </div>
    );
  };
  
export default ScheduleAppointmentAlert;
