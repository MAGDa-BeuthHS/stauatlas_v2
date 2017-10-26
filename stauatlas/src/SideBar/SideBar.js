import React from 'react';

import './sidebar.css';

const getClass = (isOpen) => {
  console.log(isOpen)
  return isOpen ? 'sidebar open' : 'sidebar';
}

const SideBar = ({isOpen}) => (

  <div className={getClass(isOpen)}>
    <div>I slide into view</div>
  </div>
);

export default SideBar;