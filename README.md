# Stauatlas

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Preconditions

Make sure you have **Node >= 6** on your machine.    
Download the [https://fb.me/react-devtools](React DevTools) for a better development experience  

## Install

### Install MySQL 
First you have to install a local MySQL database

**For Ubuntu:**
```
  sudo apt-get install mysql-server
  sudo mysql_secure_installation
```      

**For Mac OS X**

```bash
  brew install mysql
```

Edit the MySQL config-file       
OSX: `~/.my.cnf` (create if not exists)  
Ubuntu: `/etc/mysql/my.cnf`  
and add the following option:

```ini
[mysqld]
secure_file_priv = ''
```

Then restart mysql server:
**For Mac OS X**: `mysql.server restart`     

**For Linux**: `sudo service mysql restart` 


#### Create a database.
Type `mysql -u root` to open the MySql Terminal    
and create a database with
```
  CREATE DATABASE masterprojektgeschwindigkeitsdaten;

  USE masterprojektgeschwindigkeitsdaten;
```

Create the tables with
```
  CREATE TABLE speed_limits (
    sensor_id int(11) NOT NULL,
    speed_limit float DEFAULT NULL,
    PRIMARY KEY (sensor_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

  CREATE TABLE gps_coordinates (
    sensor_id int(11) NOT NULL,
    latitude double DEFAULT NULL,
    longitude double DEFAULT NULL,
    PRIMARY KEY (sensor_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

  CREATE TABLE sensor_data (
    sensor_id int(11) NOT NULL,
    speed int(11) NOT NULL,
    timestamp datetime NOT NULL,
    KEY sensor_ids (sensor_id),
    KEY timestamps (timestamp),
    KEY time_sensor (sensor_id,timestamp)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

```

and import the given data

```
  LOAD DATA [LOCAL] INFILE 'your/path/to/sensordata_export.csv'
  INTO TABLE sensor_data
  FIELDS TERMINATED BY ','
  ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 ROWS;

  LOAD DATA [LOCAL] INFILE 'your/path/to/speed_limits.csv'
  INTO TABLE speed_limits
  FIELDS TERMINATED BY ','
  ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 ROWS;

  LOAD DATA [LOCAL] INFILE 'your/path/to/gps_coordinates.csv'
  INTO TABLE gps_coordinates
  FIELDS TERMINATED BY ','
  ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 ROWS;
```

Make sure to set `DB_NAME` environment variable to the name of your local mysql database:

```
export DB_NAME=<your db name>
```

### Install the other stuff

```
npm install
```

## Start 
For starting the **front-end server** use

```
npm start
```

Then open [http://localhost:3000/](http://localhost:3000/) to see your app.
When you’re ready to deploy to production, create a minified bundle with npm run build.


Next, start **backend server** with:

```
npm run backend
```

## Libs
- [react-leaflet](https://github.com/PaulLeCam/react-leaflet)
- [mapbox](https://www.mapbox.com)
- [moment.js](http://momentjs.com/docs/)
- [lodash](https://lodash.com/docs)
