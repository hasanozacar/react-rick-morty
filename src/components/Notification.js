import React from 'react';

const Notification = ({ message, type, onClose }) => {
  return (
    <div className={`notification ${type}`}>
      <p>{message}</p>
      <button onClick={onClose}>Kapat</button>
    </div>
  );
};

export default Notification;
