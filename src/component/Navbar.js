import React from 'react';
import '../style/Navbar.css'; // CSS 별도 분리

function Navbar({ statuses, selected, onSelectStatus }) {
  
    return (
    <div className="navbar">
      {statuses.map((status, index) => (
        <button
          key={index}
          className={`nav-button ${selected === status ? 'active' : ''}`}
          onClick={() => onSelectStatus(status)}
        >
          {status}
        </button>
      ))}
    </div>
  );
}

export default Navbar;
