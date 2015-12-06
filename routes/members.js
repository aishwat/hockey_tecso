var Member = require('./Models').Member;
var idvalidator = require('mongoose-id-validator');

var members = {
    get: function(req, res) {
        Member.find({}, function(err, docs) {
            if (err)
                console.log(err)
            else
                res.send(docs);
        })
    },
    getByKeyVal: function(req, res) {
        var key = req.params.key;
        var val = req.params.val;
        var obj = {};
        obj[key] = val
        Member.find(obj,
            function(err, docs) {
                if (err)
                    console.log(err)
                else
                    res.send(docs);
            })

    },

    deleteByKeyVal: function(req, res) {
        var key = req.params.key;
        var val = req.params.val;
        var obj = {};
        obj[key] = val
        Member.findOneAndRemove(obj,
            function(err, docs) {
                if (err)
                    console.log(err)
                else
                    res.send(docs);
            })
    },
    upsert: function(req, res) {

        var mem = new Member({
            _id: req.body._id,
            name: req.body.name,
            token: req.body.token,
            devices:req.body.devices
        })
        // mem.devices = req.body.devices

        mem.validate(function(err) {
            if (err){
                console.log(err)
                res.send('invalid device id');
            }
            else {
                var member = {
                    _id: req.body._id,
                    name: req.body.name,
                    token: req.body.token,
                    devices: req.body.devices
                }
                Member.findOneAndUpdate({
                        _id: req.body._id
                    }, member, {
                        upsert: true
                    },
                    function(err, docs) {
                        if (err)
                            console.log(err)
                        else
                            res.send(docs);
                    })
            }
        })


    }

}

module.exports = members
