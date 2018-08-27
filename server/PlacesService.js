const config = require('./config');
const fetch = require('node-fetch');
var Places = require('../models/Places');

module.exports = class PlacesService {
    constructor() {
        this.requestUrl = config.requestUrl;
    }

    saveResult(result) {
        let places = [];
        result.map(restaurant => {
                let place = new Places();
                const { location } = restaurant.geometry;
                place.id = restaurant.id;
                place.name = restaurant.name;
                place.lat = location.lat;
                place.lng = location.lng;
                place.save();
                places.push(place);
            }
        );

        return places;
    }

    getMarkers() {
        return fetch(this.requestUrl)
                .then(res => res.json())
                .then(data => this.saveResult(data.results));
    }
}