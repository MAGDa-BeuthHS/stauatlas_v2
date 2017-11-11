import React from "react";

import "./sidebar.css";

const getClass = (isOpen) => {
    return isOpen ? 'sidebar open' : 'sidebar';
};

const SideBar = ({isOpen, handleViewSidebar}) => (

    <div className={getClass(isOpen)}>
        <div className="sidebar-header">
            <span className="title">stauatlas</span>
            <a href="#" className="sidebar-toggle-back" onClick={handleViewSidebar}>
                <i class="fa fa-angle-double-left" aria-hidden="true"></i>
            </a>
            <div className="line"></div>
        </div>
    </div>
);

export default SideBar;