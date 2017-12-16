import React from 'react';
import { Circle, Map, TileLayer, ZoomControl } from 'react-leaflet';
import PropTypes from 'prop-types';

import Legend from '../Legend/Legend';
import './map.css';

const osmLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
const cc = '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>';
const mapboxLink = '<a href="http://mapbox.com">Mapbox</a>';
const attribution = `Map data &copy; ${osmLink} contributors,${cc} , Imagery © ${mapboxLink}`;

const layer = 'https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}';
const accessToken = 'pk.eyJ1IjoiaWxvbmFjb2RlcyIsImEiOiJjajl3d3lpdjcwcjV0MzNtZGdmMzEydGtrIn0.p0Xy1clW8VbfLV5JCrtNEQ';

const url = `${layer}?access_token=${accessToken}`;

const propTypes = {
	position: PropTypes.arrayOf(PropTypes.number).isRequired,
	zoom: PropTypes.number.isRequired,
	traffic: PropTypes.arrayOf(PropTypes.shape({
		averageSpeed: PropTypes.number,
		latitude: PropTypes.number,
		longitude: PropTypes.number,
		relativeSpeed: PropTypes.number,
		sensor_id: PropTypes.number,
		speed_limit: PropTypes.number,
		color: PropTypes.string,
	})).isRequired,
	filterTrafficByColor: PropTypes.func.isRequired,
};

export const MapView = ({
	position, zoom, traffic, filterTrafficByColor,
}) => {

	return (
		<Map center={position} zoom={zoom} zoomControl={false}>
			<TileLayer
				url={url}
				attribution={attribution}
			/>
			<ZoomControl position="topright" />

			<Legend filterTrafficByColor={filterTrafficByColor} />

			{traffic.map(light => (
				<Circle
					key={light.sensor_id}
					radius={111}
					color={light.color}
					fillColor={light.color}
					center={[light.latitude, light.longitude]}
					fillOpacity={0.4}
					className={`color-${light.color} traffic-light-circle`}
				/>
			))}

		</Map>
	);
};

MapView.propTypes = propTypes;
