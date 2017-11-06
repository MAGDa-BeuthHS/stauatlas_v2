import React, { Component } from 'react';
import './App.css';

import MapView from './MapView/MapView.js';
import SideBar from './SideBar/SideBar.js';
import Header from './Header/Header.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false
    };
  }

  handleViewSidebar = () => {
    this.setState((prevState) => {
      return {
        sidebarOpen: !prevState.sidebarOpen
      }
    });
  }

  render() {
    return (
      <div className="stauatlas-app">
        <Header handleViewSidebar={this.handleViewSidebar}/>
        <SideBar isOpen={this.state.sidebarOpen} />
        <MapView position={[51.050407,13.737262]} zoom={15} />
      </div>
    );
  }
}

export default App;
