# Stauatlas

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Preconditions

Make sure you have **Node >= 6** on your machine.

## Install

```
npm install
```

## Starting front-end server

```
npm start
```

Then open [http://localhost:3000/](http://localhost:3000/) to see your app.
When you’re ready to deploy to production, create a minified bundle with npm run build.

## Starting back-end server

Make sure to set `DB_NAME` environment variable to the name of your local mysql database:

```
export DB_NAME=<your db name>
```

Next, start backend server with:

```
npm run backend
```

## Libs
- [react-leaflet](https://github.com/PaulLeCam/react-leaflet)
- [mapbox](https://www.mapbox.com) # question!
- [moment.js](http://momentjs.com/docs/)
- [lodash](https://lodash.com/docs)
