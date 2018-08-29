const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const placesSchema = new Schema({
    id: String,
    name: String,
    lat: Number,
    lng: Number
});
module.exports = mongoose.model('Places', placesSchema);