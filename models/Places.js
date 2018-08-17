var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var placesSchema = new Schema({
    place_id: String,
    place_name: String,
    lat: String,
    lng: String
});
module.exports = mongoose.model('Places', placesSchema);