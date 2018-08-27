var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var placesSchema = new Schema({
    id: String,
    name: String,
    lat: Number,
    lng: Number
});
module.exports = mongoose.model('Places', placesSchema);