import React, { Component } from 'react';
import './App.css';

import { MapView } from './MapView/MapView';
import { SideBar } from './SideBar/SideBar';
import { Header } from './Header/Header';
import { getTrafficInfos } from './trafficService';

export class App extends Component {
  static setColor(traffic) {
    traffic.map((t) => {
      if (Math.round(t.relativeSpeed) >= 85) {
        t.color = 'green';
      } else if (Math.round(t.relativeSpeed) < 85 && Math.round(t.relativeSpeed) >= 60) {
        t.color = 'yellow';
      } else if (Math.round(t.relativeSpeed) < 60 && Math.round(t.relativeSpeed) >= 50) {
        t.color = 'orange';
      } else if (Math.round(t.relativeSpeed) < 50) {
        t.color = 'red';
      }
      return t;
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      traffic: [],
      filteredTraffic: [],
      zoom: 13,
    };
    this.filterTrafficByColor = this.filterTrafficByColor.bind(this);
    this.resetTraffic = this.resetTraffic.bind(this);
    this.handleViewSidebar = this.handleViewSidebar.bind(this);
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
      .then((traffic) => {
        App.setColor(traffic);

        this.setState((prevState) => {
          if (prevState.traffic !== traffic) {
            return {
              filteredTraffic: traffic,
              traffic,
            };
          }

          return prevState;
        });
      });
  }

  resetTraffic() {
    this.setState((prevState) => {
      if(prevState.filteredTraffic !== this.state.traffic) {
        return {
          filteredTraffic: this.state.traffic
        }
      }
    });
  }

  filterTrafficByColor(color) {
    if(color === '') {
      this.resetTraffic();
    } else {
      const filteredTraffic = this.state.traffic.filter((traffic) => traffic.color === color);
      this.setState((prevState) => {
        if(prevState.filteredTraffic !== filteredTraffic) {
          return {
            filteredTraffic
          }
        }
      })
    }
  }

  handleViewSidebar = () => {
    this.setState((prevState) => {
      return {
        sidebarOpen: !prevState.sidebarOpen
      }
    });
  };

  render() {
    return (
      <div className="stauatlas-app">
        <Header handleViewSidebar={this.handleViewSidebar} />
        <SideBar
          isOpen={this.state.sidebarOpen}
          handleViewSidebar={this.handleViewSidebar}
        />
        <MapView
          position={[51.050407, 13.737262]}
          zoom={this.state.zoom}
          traffic={this.state.filteredTraffic}
          filterTrafficByColor={this.filterTrafficByColor}
        />
      </div>
    );
  }
}
