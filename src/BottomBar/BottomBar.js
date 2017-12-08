import React from 'react';
import HolidayDatePicker from '../HolidayDatePicker/HolidayDatePicker'
import './bottom-bar.css';

export const BottomBar = ({ isOpen, handleOnDateClick, handleViewSidebar }) => {
  const openClass = isOpen ? 'open' : '';

  return (
    <div className={`bottom-bar ${openClass}`}>
      <div className="bottom-bar-options">
        <div className="general-options-selector">
          <select>
            <option value='actual'>Aktuelle Verkehrslage</option>
            <option value='general'>Generelle verkehrslage</option>
            <option value='period'>Zeitraum Verkehrslage</option>
          </select>
          <i className="fa fa-chevron-down" aria-hidden="true" />
        </div>

        <HolidayDatePicker onDateClick={handleOnDateClick}/>

      </div>

      <div className="bottom-bar-close">
        <a onClick={handleViewSidebar}>
          <span className="fa fa-angle-double-left" aria-hidden="true" />
        </a>
      </div>
    </div>);
};
