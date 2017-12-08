import React from 'react';
import './header.css';

export const Header = ({ isOpen, handleViewSidebar }) => {
  const openClass = isOpen ? 'open' : '';
  return (
    <div className={`box header ${openClass}`}>
      <a href="#" className="sidebar-toggle" onClick={handleViewSidebar}>
        <span className="fa fa-fw fa-2x fa-angle-double-right" aria-hidden="true" />
      </a>
    </div>
  );
};
