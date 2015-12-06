var Device = require('./Models').Device;

var devices = {
    get: function(req, res) {
        Device.find({}, function(err, docs) {
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
        Device.find(obj,
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
        Device.findOneAndRemove(obj,
            function(err, docs) {
                if (err)
                    console.log(err)
                else
                    res.send(docs);
            })
    },
    upsert: function(req, res) {
        var device = {
            _id: req.body._id,
            name: req.body.name,
            platform: req.body.platform,
            model: req.body.model,
            osVersion: req.body.osVersion,
            allocated: req.body.allocated
        }
        Device.findOneAndUpdate({
                _id: req.body._id
            }, device, {
                upsert: true
            },
            function(err, docs) {
                if (err)
                    console.log(err)
                else
                    res.send(docs);
            })
    }

}

module.exports = devices
