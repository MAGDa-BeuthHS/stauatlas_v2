import React from 'react';
import moment from 'moment';
import './header.css';

const Header = ({ handleViewSidebar }) => (      
  <div className="header">
    <h1 className="title">
      <button className="btn-icon" onClick={handleViewSidebar}>
        <span className="fa fa-lg fa-bars"/>
      </button>
      Stauatlas Dresden
      <div className="time">{moment().format('DD.MM.YY - HH:mm')}</div>
    </h1>
  </div>       
);

export default Header;
