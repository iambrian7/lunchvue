var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
   // user: {type: Schema.Types.ObjectId, ref: 'User'},
    "date": {type: String, required: true},
    "group": {type: String, required: true},
    "restaurant": {type: String, required: true},
    "owner": {type: String, required: true},
    "time": {type: String, required: false},
    "rating": {type: String, required: false},
    "votes": {type: String, required: false},
    "result": {type: String, required: false},
    "fivestar": {type: String, required: false},
    "markrecomend": {type: String, required: false},
    "benrecomend": {type: String, required: false},
    "brianrecomend": {type: String, required: false},
    "chrisrecomend": {type: String, required: false},
    "avetip": {type: String, required: false},
    "style": {type: String, required: false},
    "notes": {type: String, required: false},
    "address": {type: String, required: true},
    "website": {type: String, required: false},
    "lat": {type: String, required: false},
    "lng": {type: String, required: false},
});

module.exports = mongoose.model('Lunch', schema);