import React from 'react';
import { Map, TileLayer } from 'react-leaflet';

import './map.css';

const attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
const url = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';

const MapView = ({ position, zoom, maxZoom }) => (
  <Map center={position} zoom={zoom} zoomControl={false}>
    <TileLayer
      url={url}
      attribution={attribution}
    />
    <div className="box box-legend">
      <h5>Farblegende</h5>
      <ul className="map-legend">
        <li><span className="legend-red" />50%</li>
        <li><span className="legend-orange" />50% - 60%</li>
        <li><span className="legend-yellow" />60% - 85%</li>
        <li><span className="legend-green" /> >= 85%</li>
      </ul>
    </div>
  </Map>
)

export default MapView;