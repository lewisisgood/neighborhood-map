# Neighborhood Map
An interactive map of one of my favorite neighborhoods.

This single page application highlights some facsinating locations with Google Maps markers on a map, using the Google Maps API. When a user clicks a location in the list on the left hand side, an info window is populated on the map for the location's respective marker. This info window contains information about the selected location, including a picture which is populated using the Foursquare API. Users can also search for specific locations in the list using the provided filter.

### Installing

From the Terminal, clone this repo onto your computer with:

```
git clone https://github.com/lewisisgood/neighborhood-map
```

Move into the new directory:

```
cd neighborhood-map/
```

Add your Google Maps and Foursquare API keys to the ```config.json``` file. If you do not have them yet, visit the sites in the "Build With" section below to sign up for these free services.

Install all packages and dependencies to run the application:

```
npm install
```

Build the package with Webpack (and watch for code updates):

```
npx webpack --watch
```

On your local machine, navigate to the dist folder ```neighborhood-map/dist/```. Open ```index.html``` in the browser, and have some fun with the neighborhood map!


## Built With

* HTML
* CSS
* Javascript / jQuery / KnockoutJS
* [Webpack](https://webpack.js.org/)
* [Bootstrap](https://getbootstrap.com)
* [Google Maps API](https://developers.google.com/maps/documentation/javascript/tutorial)
* [Foursquare API](https://developer.foursquare.com/)

## Authors

* **Lewis King** - [Github](https://github.com/lewisisgood)

## Acknowledgments

* Thanks to Udacity for providing code inspiration via the lessons