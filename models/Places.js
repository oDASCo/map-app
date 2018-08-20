var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var placesSchema = new Schema({
    place_id: String,
    place_name: String,
    lat: Number,
    lng: Number
});
module.exports = mongoose.model('Places', placesSchema);