import React from 'react';
import './StatusMessage.css';
import tick from './assets/tick.png';
import x from './assets/x.png';

const StatusMessage = ({ message, type }) => {
  const imagePath = type === "tick" ? tick : x;
  message= (message==="AC"? "Accepted": "Rejected")
  return (
    <div className={`status-message ${type}`}>
      <img src={imagePath} alt={`${type} icon`} />
      <p>{message}</p>
    </div>
  );
};

export default StatusMessage;
