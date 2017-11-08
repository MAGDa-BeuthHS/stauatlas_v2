import React, { Component } from 'react';
import './App.css';

import MapView from './MapView/MapView.js';
import SideBar from './SideBar/SideBar.js';
import Header from './Header/Header.js';
import { getTrafficInfos } from './trafficService'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      trafficData: []
    };
  }

  componentDidMount() {
    /* 
    [{
      averageSpeed: 35,
      latitude:     51.118823986987536,
      longitude:    13.76635460086739,
      relativeSpeed:70,
      sensor_id:    1178,
      speed_limit:  50,
    }]
    */
    getTrafficInfos()
    .then(traffic => {
      this.setState((prevState) => {
        if(prevState !== traffic) {
          return {
            trafficData: traffic
          }
        }
      })
    });
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
        <MapView 
          position={[51.050407,13.737262]}
          zoom={13}
          traffic={this.state.trafficData}/>
      </div>
    );
  }
}

export default App;
