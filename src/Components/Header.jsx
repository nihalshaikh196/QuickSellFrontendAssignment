import React, { useState, useRef, useEffect } from 'react';
import { useBoard } from '../Context/BoardContext';
import "../Styles/header.css"
import DisplaySVG from "../utils/Display.svg"
import DownSVG from "../utils/down.svg"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { grouping, updateOrdering, ordering, updateGrouping } = useBoard();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header>
      <div className="dropdown" ref={dropdownRef}>
        <button className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
          <img src={DisplaySVG} alt='Display'/>
          Display
          <img src={DownSVG} alt='Display'/>
        </button>
        {isOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-section">
              <span>Grouping</span>
              <select
                value={grouping}
                onChange={(e) => updateGrouping(e.target.value)}
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="dropdown-section">
              <span>Ordering</span>
              <select
                value={ordering}
                onChange={(e) => updateOrdering(e.target.value)}
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;