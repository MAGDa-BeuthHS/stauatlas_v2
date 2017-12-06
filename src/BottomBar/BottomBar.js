import React from 'react';

import './bottom-bar.css';

const activateSelect = (selectInput) => {
  if (document.createEvent) { // chrome and safari
    const event = document.createEvent('MouseEvents');
    event.initMouseEvent('mousedown', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    selectInput.dispatchEvent(event);
  }
};

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
        <i className="fa fa-chevron-down" aria-hidden="true" />
      </div>


      <div className="bottom-bar-close">
        <a href="#" onClick={handleViewSidebar}>
          <span className="fa fa-angle-double-left" aria-hidden="true" />
        </a>
      </div>
    </div>);
};
