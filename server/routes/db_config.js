/* eslint-disable no-undef */


// Update with your config settings.

module.exports = {

	dev: {
		db_name: process.env['DB_NAME'] || 'masterprojektgeschwindigkeitsdaten',
		host: 'localhost',
		user: 'root',
		password: '',
		dialect: 'mysql'
	},
	prod: {
		db_name: 'db_name',
		host: 'dbhost.beuth-hochschule.de',
		user: 'user',
		password: 'password',
		dialect: 'mysql'
	},
	postgres_local: {
		db_name: 'postgres',
		host: 'localhost',
		user: 'postgres',
		password: '1234',
		port: '5432',
		dialect: 'postgres',
	},


};
