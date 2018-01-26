import React, { Component } from 'react';
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
	circleRadius: PropTypes.number.isRequired,
	position: PropTypes.arrayOf(PropTypes.number).isRequired,
	traffic: PropTypes.arrayOf(PropTypes.shape({
		averageSpeed: PropTypes.string,
		latitude: PropTypes.number,
		longitude: PropTypes.number,
		relativeSpeed: PropTypes.number,
		sensor_id: PropTypes.number,
		speed_limit: PropTypes.number,
		color: PropTypes.string,
	})).isRequired,
	filterTrafficByColor: PropTypes.func.isRequired,
	handleZoomend: PropTypes.func.isRequired,
};

export class MapView extends Component {

	setPosition = () => {
		this.refs.map.leafletElement.panTo(this.props.position); //eslint-disable-line
	};

	render() {
		const {
			circleRadius, handleZoomend, position,
			traffic, filterTrafficByColor
		} = this.props;

		const map = 'map';

		return (
			<Map
				ref={map}
				center={position}
				zoom={13}
				minZoom={11}
				maxZoom={18}
				onZoomend={handleZoomend}
				zoomControl={false}>
				<TileLayer
					url={url}
					attribution={attribution}
				/>
				<ZoomControl position="topright" />

				<span className="title">Stauatlas</span>

				<div className="box location-btn">
					<a
						className="btn-icon"
						onClick={this.setPosition}
						title="Lokalisieren" >
						<span className="fa fa-fw fa-lg fa-dot-circle-o"/>
					</a>
				</div>
				<Legend filterTrafficByColor={filterTrafficByColor} />

				{traffic.map(sensor => (
					<Circle
						key={sensor.sensor_id}
						center={[sensor.latitude, sensor.longitude]}
						radius={circleRadius}
						color={sensor.color}
						className={`color-${sensor.color} traffic-light-circle`}
						fillColor={sensor.color}
						fillOpacity={0.4}
					/>
				))}

			</Map>
		);
	}
}

MapView.propTypes = propTypes;
