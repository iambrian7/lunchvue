var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
   // user: {type: Schema.Types.ObjectId, ref: 'User'},
    "created": {type: String, required: true},
    "name": {type: String, required: true},
    "email": {type: String, required: true},
    "location": {type: String, required: true},
    "members":{type:Array, required: true}
});

module.exports = mongoose.model('Group', schema);