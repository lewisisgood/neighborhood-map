require('bootstrap/dist/css/bootstrap.min.css');
require('./css/main.css');
const map = require('./src/map.js');
const viewmodel = require('./src/viewmodel.js');
const config = require('./config.json');
const loadGoogleMapsApi = require('load-google-maps-api');
const ko = require('knockout');

loadGoogleMapsApi({
	key: config.gmapsApiKey,
	libraries: ['places']
}).then(map.init).catch(function (error) {
  console.error(error)
});

ko.applyBindings(viewmodel);