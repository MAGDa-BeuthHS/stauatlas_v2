import React from "react";
import {Circle, Map, TileLayer} from "react-leaflet";

import "./map.css";

const osmLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>'
const cc = '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
const mapboxLink = '<a href="http://mapbox.com">Mapbox</a>'
const attribution = 'Map data &copy; ' + osmLink + ' contributors,' + cc + ' , Imagery © ' + mapboxLink;

// Two variants of the TileLayer color

// const layer = 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png';
// const accessToken = 'pk.eyJ1Ijoic2FraW1hIiwiYSI6ImNqMXo5Z3F2bTAwZnUyeG41N210eWRtbGUifQ.vQjupMfaIwku2OMNsaPTDA'

const layer = 'https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}';
const accessToken = 'pk.eyJ1IjoiaWxvbmFjb2RlcyIsImEiOiJjajl3d3lpdjcwcjV0MzNtZGdmMzEydGtrIn0.p0Xy1clW8VbfLV5JCrtNEQ';

const url = layer + '?access_token=' + accessToken;

const MapView = ({position, zoom, traffic, increaseZoom, decreaseZoom}) => (

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
                fillOpacity={.4}
                className="traffic-light-circle"
            />
        ))}


        <div className="box box-zoom">
            <ul className="zoom-button">
                <li onClick={increaseZoom}>+</li>
                <li className="border"></li>
                <li onClick={decreaseZoom}>–</li>
            </ul>
        </div>

        <div className="box box-legend">
            <ul className="map-legend">
                <li><span className="legend-red"/></li>
                <li><span className="legend-orange"/></li>
                <li><span className="legend-yellow"/></li>
                <li><span className="legend-green"/></li>
            </ul>
        </div>

    </Map>
);

export default MapView;
