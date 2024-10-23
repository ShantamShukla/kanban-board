import React, { useState } from 'react';
import './Header.css';

const Header = ({ grouping, ordering, onDisplayChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleGroupingChange = (e) => {
    onDisplayChange(e.target.value, ordering);
  };

  const handleOrderingChange = (e) => {
    onDisplayChange(grouping, e.target.value);
  };

  return (
    <div className="header">
      <div className="display-dropdown">
        <button className="display-button" onClick={handleDropdownClick}>
          <i className="fas fa-sliders-h"></i>
          Display
          <i className={`fas fa-chevron-${isDropdownOpen ? 'up' : 'down'}`}></i>
        </button>
        
        {isDropdownOpen && (
          <div className="dropdown-content">
            <div className="dropdown-row">
              <span>Grouping</span>
              <select value={grouping} onChange={handleGroupingChange}>
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="dropdown-row">
              <span>Ordering</span>
              <select value={ordering} onChange={handleOrderingChange}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;