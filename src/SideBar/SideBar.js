import React from 'react';

import './sidebar.css';

const getClass = isOpen => (isOpen ? 'sidebar open' : 'sidebar');

export const SideBar = ({ isOpen, handleViewSidebar }) => (

  <div className={getClass(isOpen)}>
    <div className="sidebar-header">
      <span className="title">stauatlas</span>
      <a href="#" className="sidebar-toggle-back" onClick={handleViewSidebar}>
        <i className="fa fa-chevron-down" aria-hidden="true" />
      </a>
      <div className="line" />
    </div>
  </div>
);
