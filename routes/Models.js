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
    _id: String, //email or tpx
    name: String,
    token: String,
    devices: [{
        type: Number,
        ref: 'Device'
    }]
});
memberSchema.plugin(idvalidator);

var appSchema = new Schema({
    //default
    name: String,
    platform: String,
    releaseType: String,
    minOS: String,

    apps: [{
        version: String,
        build: String,
        lastUpdated: String,
        size: String,
        note: String
    }]
});

var teamSchema = new Schema({
    // _id: String, //name (unique names)
    name: String,
    tag: String,
    appMemberRoles: [{
        app: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'App'
        },
        member: {
            type: String,
            ref: 'Member'
        },
        role: {
            type: String
        }
    }]

});
teamSchema.plugin(idvalidator);


var Device = mongoose.model('Device', deviceSchema);
var Member = mongoose.model('Member', memberSchema);
var App = mongoose.model('App', appSchema);
var Team = mongoose.model('Team', teamSchema);


module.exports = {
    Device: Device,
    Member: Member,
    App: App,
    Team: Team
}
