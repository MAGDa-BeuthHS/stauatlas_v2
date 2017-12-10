import React from 'react';
import HolidayDatePicker from '../HolidayDatePicker/HolidayDatePicker'
import './bottom-bar.css';

export const BottomBar = ({ isOpen, handleOnDateClick, handleViewSidebar }) => {
  const openClass = isOpen && 'open';
  const arrowClass = isOpen ? 'left' : 'right';

  return (
    <div className={`box bottom-bar ${openClass}`}>

      <div className="bottom-bar-options">
        <div className="general-options-selector">
          <select>
            <option value='actual' selected>Aktuelle Verkehrslage</option>
            <option value='general'>Generelle Verkehrslage</option>
            <option value='period'>Zeitraum Verkehrslage</option>
          </select>
          <i className="fa fa-chevron-down" aria-hidden="true" />
        </div>

        <HolidayDatePicker onDateClick={handleOnDateClick}/>

      </div>

      <a className="bottombar-toggle" onClick={handleViewSidebar}>
        <span
          className={`fa fa-2x fa-fw fa-angle-double-${arrowClass}`}
          aria-hidden="true" />
      </a>

    </div>
  );
};
