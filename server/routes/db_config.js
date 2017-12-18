

// Update with your config settings.

module.exports = {

    dev: {
        db_name: process.env['DB_NAME'] || 'masterprojektgeschwindigkeitsdaten',
        host: 'localhost',
        user: 'root',
        password: ''
    },
    prod: {
        db_name: 'db_name',
        host: 'dbhost.beuth-hochschule.de',
        user: 'user',
        password: 'password'
    },

};
