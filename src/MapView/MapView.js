import React from "react";
import {Circle, Map, TileLayer, ZoomControl} from "react-leaflet";
import PropTypes from 'prop-types';

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


const propTypes = {
	position: PropTypes.array.isRequired,
	zoom: PropTypes.number.isRequired,
	traffic: PropTypes.array.isRequired,
	filterTrafficByColor: PropTypes.func.isRequired,
};

const MapView = ({position, zoom, traffic, filterTrafficByColor}) => (

	<Map center={position} zoom={zoom} zoomControl={false}>
		<TileLayer
			url={url}
			attribution={attribution}
		/>
		<ZoomControl position="topright" />

			{traffic.map(light => (
				<Circle
					key={light.sensor_id}
					radius={111}
					color={light.color}
					fillColor={light.color}
					center={[light.latitude, light.longitude]}
					fillOpacity={.4}
					className={`color-${light.color} traffic-light-circle`}
				/>
			))}

			<div className="box box-legend">
				<ul className="map-legend">
					<li onClick={filterTrafficByColor.bind(this, 'red')}>
						<span className="color-red" title="stockend"/>
					</li>
					<li onClick={filterTrafficByColor.bind(this, 'orange')}>
						<span className="color-orange" title="leicht stockend"/>
					</li>
					<li onClick={filterTrafficByColor.bind(this, 'yellow')}>
						<span className="color-yellow" title="etwas flüssiger"/>
					</li>
					<li onClick={filterTrafficByColor.bind(this, 'green')}>
						<span className="color-green" title="fließend"/>
					</li>
					<li onClick={filterTrafficByColor.bind(this, '')}>
						<span className="color-gray" title="zurücksetzen"/>
					</li>
				</ul>
			</div>
	</Map>
);

MapView.propTypes = propTypes;
export default MapView;
