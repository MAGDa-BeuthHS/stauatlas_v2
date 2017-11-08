import React from 'react';
import { Map, TileLayer, Circle } from 'react-leaflet';

import './map.css';

const osmLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>'
const cc = '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
const mapboxLink = '<a href="http://mapbox.com">Mapbox</a>'
const attribution = 'Map data &copy; ' + osmLink + ' contributors,' + cc + ' , Imagery © ' + mapboxLink;

const layer = 'https://api.mapbox.com/styles/v1/mapbox/basic-v9/tiles/256/{z}/{x}/{y}';
const accessToken = 'pk.eyJ1Ijoic2FraW1hIiwiYSI6ImNqMXo5Z3F2bTAwZnUyeG41N210eWRtbGUifQ.vQjupMfaIwku2OMNsaPTDA'
const url = layer + '?access_token=' + accessToken;


const MapView = ({ position, zoom, traffic}) => (
  <Map center={position} zoom={zoom} zoomControl={false}>
    <TileLayer
      url={url}
      attribution={attribution}
    />

    {traffic.map(light => (
      <Circle
        key={light.sensor_id}
        radius={33}
        color={light.color}
        fillColor={light.color}
        center={[light.latitude, light.longitude]}
      />
    ))}
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