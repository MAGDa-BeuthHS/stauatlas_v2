import React from 'react';
import moment from 'moment';
import './header.css';

const Header = ({ handleViewSidebar }) => (
  <div className="header">
    <a href="#" className="sidebar-toggle" onClick={handleViewSidebar}>
      <span className="fa fa-angle-double-right" aria-hidden="true" />
    </a>
    <div className="time">{moment().format('DD.MM.YY - HH:mm')}</div>
  </div>
);

export default Header;
