require('bootstrap/dist/css/bootstrap.min.css');
require('./css/main.css');
const loadGoogleMapsApi = require('load-google-maps-api');
const ko = require('knockout');
const map = require('./src/map.js');
const viewmodel = require('./src/viewmodel.js');
const config = require('./config.json');

loadGoogleMapsApi({
	key: config.gmapsApiKey,
	libraries: ['places'],
	timeout: 8000
}).then(map.init).catch(function (error) {
	window.alert(error);
});

ko.applyBindings(viewmodel);