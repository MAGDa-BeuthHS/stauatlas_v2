import React from 'react';
import HolidayDatePicker from '../HolidayDatePicker/HolidayDatePicker'
import './bottom-bar.css';

export const BottomBar = ({ isOpen, handleViewSidebar }) => {
  const openClass = isOpen ? 'open' : '';

  return (
    <div className={`bottom-bar ${openClass}`}>
      <div className="bottom-bar-options">
        <select className="general-options-selector">
          <option>Aktuelle Verkehrslage</option>
          <option>Generelle verkehrslage</option>
          <option>Zeitraum Verkehrslage</option>
        </select>

        <HolidayDatePicker />

        <i className="fa fa-chevron-down" aria-hidden="true" />
      </div>

      <div className="bottom-bar-close">
        <a href="#" onClick={handleViewSidebar}>
          <span className="fa fa-angle-double-left" aria-hidden="true" />
        </a>
      </div>
    </div>);
};
