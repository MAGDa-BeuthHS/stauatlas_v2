import React, { Component } from 'react';
import './App.css';

import MapView from './MapView/MapView.js';
import SideBar from './SideBar/SideBar.js';

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
        <header className="header">
          <h1 className="title">
            <button onClick={this.handleViewSidebar}>click</button>
            Stauatlas Dresden
          </h1>
        </header>

        <SideBar isOpen={this.state.sidebarOpen} />
        <MapView position={[51.050407,13.737262]} zoom={15} />
      </div>
    );
  }
}

export default App;
