/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const moment = require('moment');
const Sequelize = require('sequelize');
const config = require('./db_config.js');

// let conn = config['postgres_5433'];
let conn = config['postgres'];

const sequelize = new Sequelize(conn.db_name, conn.user, conn.password, {
	host: conn.host,
	port: conn.port,
	dialect: conn.dialect,
	define: {
		timestamps: false  // I don't want timestamp fiels by default
	},

	pool: {
		max: 5,
		min: 0,
		idle: 10000
	}
});

//Function to format the result:
let formatResult = function (avgSpeeds) {
	let result = [];
	_.each(avgSpeeds, function (val) {
		val = val.toJSON();
		// console.log(val);
		let tmp = {
			sensor_id: val.sensor_id,
			relativeSpeed: val.avg_speed * 100 / val.sensor_speed_limit.speed_limit,
			averageSpeed: val.avg_speed,
			latitude: val.sensor_gps_coordinate.latitude,
			longitude: val.sensor_gps_coordinate.longitude,
			speed_limit: val.sensor_speed_limit.speed_limit
		};
		result.push(tmp);

	});
	console.log('Formatresult, Länge: ' + result.length);
	return result;
};


sequelize
	.authenticate()
	.then(function () {
		console.log('Connection has been established successfully.');
	})
	.catch(function (err) {
		console.log('Unable to connect to the database:', err);
	});


// Sensordata model
let SensorModel = sequelize.define('sensor_data', {
	sensor_id: {
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	speed: {
		type: Sequelize.FLOAT
	},
	timestamp: {
		type: Sequelize.DATE,
		primaryKey: true
	}
});



// GPS Coordinates model
let GPS_Data = sequelize.define('sensor_gps_coordinates', {
	sensor_id: {
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	latitude: {
		type: Sequelize.DOUBLE
	},
	longitude: {
		type: Sequelize.DOUBLE
	}
});
SensorModel.belongsTo(GPS_Data, {foreignKey: 'sensor_id'});

// Speed_limit model
let Speed_Limits = sequelize.define('sensor_speed_limits', {
	sensor_id: {
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	speed_limit: {
		type: Sequelize.FLOAT
	}
});
SensorModel.belongsTo(Speed_Limits, {foreignKey: 'sensor_id'});

// RoadsOSM Model
let RoadsOSMModel = sequelize.define('roads_osm', {
	gid: {
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	osm_id: {
		type: Sequelize.CHAR(11)
	},
	name: {
		type: Sequelize.CHAR(48)
	},
	ref: {
		type: Sequelize.CHAR(16)
	},
	type: {
		type: Sequelize.CHAR(16)
	},
	oneway: {
		type: Sequelize.SMALLINT
	},
	bridge: {
		type: Sequelize.SMALLINT
	},
	tunnel: {
		type: Sequelize.SMALLINT
	},
	maxspeed: {
		type: Sequelize.SMALLINT
	},
	geom: {
		type: Sequelize.GEOMETRY
	},
	is_route: {
		type: Sequelize.SMALLINT
	}
}, {
	freezeTableName: true
});

// Avg_Speed model
let Avg_Speed = sequelize.define('road_avg_speed', {
	gid: {
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	direction: {
		type: Sequelize.INTEGER
	},
	avg: {
		type: Sequelize.INTEGER
	}
}, {
	freezeTableName: true
});
RoadsOSMModel.belongsTo(Avg_Speed, {foreignKey: 'gid'});


router.get('/change/:date/:precision', function (req, res) {
	let date = moment();
	if (req.params.date !== 'null') {
		date = moment(req.params.date);
	}
	date.set('year', 2014);
	date.set('minute', 0);
	date.set('second', 0);
	date.set('millisecond', 0);


	let findArr = [];
	for (let i = 0; i < 24; i += parseInt(req.params.precision)) {
		let tmp = date.clone();
		tmp.set('hour', i);
		tmp.add(1, 'hours');
		if (tmp.isDST()) tmp.add(1, 'hours');
		findArr.push({
			timestamp: {
				$between: [tmp.toDate(), (tmp.add(0, 'minutes')).toDate()]
			}
		});
	}

	SensorModel.findAll({
		include: [
			{
				model: Speed_Limits,
				where: Sequelize.where(
					Sequelize.col('sensor_speed_limit.sensor_id'),
					Sequelize.col('sensor_data.sensor_id'))
			},
			{
				model: GPS_Data,
				where: Sequelize.where(
					Sequelize.col('sensor_gps_coordinate.sensor_id'),
					Sequelize.col('sensor_data.sensor_id'))
			}
		],
		attributes: ['sensor_id', [sequelize.fn('AVG', sequelize.col('speed')), 'avg_speed'], 'timestamp'],
		where: {
			speed: {
				$gt: 0
			},
			$or: findArr
		},
		group: ['timestamp', 'sensor_speed_limit.sensor_id', 'sensor_gps_coordinate.sensor_id', 'sensor_data.sensor_id']
	})
		.then(function (data) {
			let result = [];
			_.each(data, function (val) {
				val = val.toJSON();
				let tmp = {
					timestamp: val.timestamp,
					sensor_id: val.sensor_id,
					relativeSpeed: val.avg_speed * 100 / val.sensor_speed_limit.speed_limit,
					averageSpeed: val.avg_speed,
					latitude: val.sensor_gps_coordinate.latitude,
					longitude: val.sensor_gps_coordinate.longitude,
					speed_limit: val.sensor_speed_limit.speed_limit
				};
				result.push(tmp);
			});
			console.log('Verlauf Resultat Länge: ', result.length);

			res.send(_.sortBy(result, ['timestamp', 'relativeSpeed']));
		});
});

router.get('/range/:time/:range/:days', function (req, res) {
	let dateArr = [];
	let days = req.params.days.split(',');
	let time = moment(req.params.time);
	days.forEach(function (day) {
		let dates = [];
		let startdate = moment().set('year', 2014).startOf('year').startOf('month')
			.day(day).set('hour', time.get('hour')).set('minute', time.get('minute'));
		if (startdate.get('year') < 2014) {
			startdate.add(7, 'd');
		}
		while (startdate.get('year') < 2015) {
			dates.push(startdate.clone());
			startdate.add(7, 'd');
		}
		_.each(dates, function (date) {
			date.add(1, 'hour');
			if (date.isDST()) date.add(1, 'hour');
			dateArr.push({
				timestamp: {
					$between: [date.toDate(), date.add(req.params.range, 'minutes').toDate()]
				}
			});
		});
	});


	// use dateArr to find data in db
	SensorModel.findAll({
		include: [
			{
				model: Speed_Limits,
				where: Sequelize.where(
					Sequelize.col('sensor_speed_limit.sensor_id'),
					Sequelize.col('sensor_data.sensor_id'))
			},
			{
				model: GPS_Data,
				where: Sequelize.where(
					Sequelize.col('sensor_gps_coordinate.sensor_id'),
					Sequelize.col('sensor_data.sensor_id'))
			}
		],
		attributes: ['sensor_id', [sequelize.fn('AVG', sequelize.col('speed')), 'avg_speed']],
		where: {
			speed: {
				$gt: 0
			},
			$or: dateArr
		},
		group: ['sensor_speed_limit.sensor_id', 'sensor_gps_coordinate.sensor_id', 'sensor_data.sensor_id']
	})
		.then(function (data) {
			let result = formatResult(data);
			res.send(_.sortBy(result, ['relativeSpeed']));
		});
});

router.get('/change/:startdate/:duration/:precision', function (req, res) {

	let startdate = moment().set('hour', 0);

	if (req.params.startdate !== 'null') {
		startdate = moment(req.params.startdate);
	}
	if (req.params.precision === 'null') req.params.precision = 1;
	startdate.set('year', 2014);
	startdate.set('minute', 0);
	startdate.set('second', 0);
	startdate.set('millisecond', 0);

	let endDate = startdate.clone().add(req.params.duration, 'hours');

	let findArr = [];

	let tmpDate = startdate.clone();
	while (tmpDate.diff(endDate, 'seconds') < 0) {
		let tmp = tmpDate.clone();
		tmp.add(1, 'hours');
		if (tmp.isDST()) tmp.add(1, 'hours');
		findArr.push({
			timestamp: {
				$between: [tmp.clone().toDate(), (tmp.clone().add(0, 'minutes')).toDate()]
			}
		});
		tmpDate.add(1, 'hour');
	}

	console.log(startdate);
	console.log(endDate);
	//TODO irgendwas stimmt mit den timestamps in der abfrage nicht

	SensorModel.findAll({
		include: [
			{
				model: Speed_Limits,
				where: Sequelize.where(
					Sequelize.col('sensor_speed_limit.sensor_id'),
					Sequelize.col('sensor_data.sensor_id'))
			},
			{
				model: GPS_Data,
				where: Sequelize.where(
					Sequelize.col('sensor_gps_coordinate.sensor_id'),
					Sequelize.col('sensor_data.sensor_id'))
			}
		],
		attributes: [
			'sensor_id',
			[sequelize.fn('AVG', sequelize.col('speed')), 'avg_speed'],
			'timestamp'],
		where: {
			speed: {
				$gt: 0
			},
			$or: findArr
		},
		group: [
			'timestamp',
			'sensor_speed_limit.sensor_id', 'sensor_gps_coordinate.sensor_id', 'sensor_data.sensor_id'
		]
	})
		.then(function (data) {

			let result = [];
			_.each(data, function (val) {
				val = val.toJSON();
				let tmp = {
					timestamp: val.timestamp,
					sensor_id: val.sensor_id,
					relativeSpeed: val.avg_speed * 100 / val.sensor_speed_limit.speed_limit,
					averageSpeed: val.avg_speed,
					latitude: val.sensor_gps_coordinate.latitude,
					longitude: val.sensor_gps_coordinate.longitude,
					speed_limit: val.sensor_speed_limit.speed_limit
				};
				result.push(tmp);
			});
			console.log('Verlauf Resultat Länge: ', result.length);

			res.send(_.sortBy(result, ['timestamp', 'relativeSpeed']));
		});
});


router.get('/all/:time/:top10/:filter', function (req, res) {
	let date;
	let filter, sepIndex, filterMin, filterMax;

	if (req.params.filter !== 'undefined') {
		filter = req.params.filter;
		sepIndex = filter.indexOf(',');
		filterMin = filter.substr(0, sepIndex);
		filterMax = filter.substr(sepIndex + 1, filter.length - 1);
	}

	if (req.params.time !== 'null') {
		date = moment(req.params.time);
	} else {
		date = moment().add(1, 'hours');
		if (date.isDST()) date.add(1, 'hours');
	}

	date.set('year', 2014);

	SensorModel.findAll({
		include: [
			{
				model: Speed_Limits,
				// where: {sensor_id: Sequelize.col('sensor_data.sensor_id')}
				where: Sequelize.where(
					Sequelize.col('sensor_speed_limit.sensor_id'),
					Sequelize.col('sensor_data.sensor_id'))
			},
			{
				model: GPS_Data,
				// where: {sensor_id: Sequelize.col('sensor_data.sensor_id')}
				where: Sequelize.where(
					Sequelize.col('sensor_gps_coordinate.sensor_id'),
					Sequelize.col('sensor_data.sensor_id'))
			}
		],
		attributes: [
			// ['sensor_data.sensor_id', 'sensor_id'],
			'sensor_id',
			[sequelize.fn('AVG', sequelize.col('speed')), 'avg_speed']],
		where: {
			speed: {
				$gt: 0
			},
			timestamp: {
				$between: [date.clone().toDate(), date.clone().add(15, 'minutes').toDate()]
			}
		},
		group: ['sensor_speed_limit.sensor_id', 'sensor_gps_coordinate.sensor_id', 'sensor_data.sensor_id']
	})
		.then(function (avgSpeeds) {

			// console.log(avgSpeeds);
			let result = formatResult(avgSpeeds);
			console.log('vor dem Filtern: ' + result.length);

			//Ergebnisfilter
			let filterResult = [];

			if (req.params.filter !== 'undefined') {
				result.forEach(function (currVal) {
					if (currVal.relativeSpeed >= filterMin && currVal.relativeSpeed <= filterMax)
						filterResult.push(currVal);
				});
				console.log('nach dem Filtern: ' + filterResult.length);

			}
			else filterResult = result;


			console.log('top10:' + req.params.top10);
			if (req.params.top10 === 'true') {
				res.send(_.sortBy(filterResult, ['relativeSpeed']).slice(0, 10));
			} else {
				res.send(_.sortBy(filterResult, ['relativeSpeed']));
			}

		});
});

router.get('/roads/avg', function (req, res) {

	RoadsOSMModel.findAll({
		include: [
			{
				model: Avg_Speed,
				where: Sequelize.where(
					Sequelize.col('road_avg_speed.gid'),
					Sequelize.col('roads_osm.gid')
				)
			}
		],
		// attributes: [
		// 	'type','maxspeed','geom'
		// ],
		where: {
			type: {
				$or : ['motorway','trunk','primary','secondary','tertiary']
			},
			maxspeed: {
				$ne : null
			}
		},
		order: [
			['type']
		]
	})
		.then(function (avgRoads) {

			let result = [];
			_.each(avgRoads, function (val) {
				val = val.toJSON();
				// console.log(val);
				let tmp = {
					road_id: val.gid,
					direction: val.road_avg_speed.direction,
					relativeSpeed: val.road_avg_speed.avg * 100 / val.maxspeed,
					averageSpeed: val.road_avg_speed.avg,
					speed_limit: val.maxspeed,
					coordinates: val.geom
				};
				result.push(tmp);

			});
			console.log('Formatresult, Länge: ' + result.length);
			res.send(result);
		});
});

module.exports = router;
