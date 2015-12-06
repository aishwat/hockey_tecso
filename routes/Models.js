var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/test');
var idvalidator = require('mongoose-id-validator');

//set required fields later
var deviceSchema = new Schema({
    _id: Number, //device id
    name: String,
    platform: String,
    model: String,
    osVersion: String,
    allocated: Boolean
});

var memberSchema = new Schema({
    _id:String, //email or tpx
    name: String,
    token: String,
    devices: [{type: Number, ref: 'Device'}]
});
memberSchema.plugin(idvalidator);

var Device = mongoose.model('Device', deviceSchema);
var Member = mongoose.model('Member', memberSchema);


module.exports ={
  Device:Device,
  Member:Member
} 
