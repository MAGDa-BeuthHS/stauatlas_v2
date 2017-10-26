import React from 'react';
import { render } from 'react-dom';
import { Map, TileLayer } from 'react-leaflet';

import './map.css';

const attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
const url = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';

const MapView = ({ position, zoom, maxZoom }) => (
  <Map center={position} zoom={zoom}>
    <TileLayer
      url={url}
      attribution={attribution}
    />
  </Map>
)

export default MapView;