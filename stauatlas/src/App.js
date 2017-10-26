import React, { Component } from 'react';
import './App.css';

import MapView from './MapView/MapView.js';

class App extends Component {
  render() {
    return (
      <div className="stauatlas-app">
        <header className="header">
          <h1 className="title">Welcome to Stauatlas</h1>
        </header>
        <MapView position={[51.050407,13.737262]} zoom={15} />
      </div>
    );
  }
}

export default App;
