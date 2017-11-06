import React from 'react';
import { Map, TileLayer } from 'react-leaflet';


import { getTrafficInfos } from '../trafficService'
import './map.css';

const osmLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>'
const cc = '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
const mapboxLink = '<a href="http://mapbox.com">Mapbox</a>'
const attribution = 'Map data &copy; ' + osmLink + ' contributors,' + cc + ' , Imagery © ' + mapboxLink;

const layer = 'https://api.mapbox.com/styles/v1/mapbox/basic-v9/tiles/256/{z}/{x}/{y}';
const accessToken = 'pk.eyJ1Ijoic2FraW1hIiwiYSI6ImNqMXo5Z3F2bTAwZnUyeG41N210eWRtbGUifQ.vQjupMfaIwku2OMNsaPTDA'
const url = layer + '?access_token=' + accessToken;

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
const testData = getTrafficInfos()
  .then(traffic => {
    console.log('traffic data: ',traffic);
  });


const MapView = ({ position, zoom }) => (
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