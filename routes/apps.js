var App = require('./Models').App;
var upload = require('./upload');

var apps = {
    get: function(req, res) {
        App.find({}, function(err, docs) {
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
        App.find(obj,
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
        App.findOneAndRemove(obj,
            function(err, docs) {
                if (err)
                    console.log(err)
                else
                    res.send(docs);
            })
    },
    upsert: function(req, res) {
        //actually never updated, as always new build generated
        //make _id before here
        var filename;
        var _res = {
            status: function(code) {
                // console.log(code);
                return this;
            },
            send: function(filename) {
                console.log(filename);
                callback();
            }
        }
        upload.put(req, _res); //it vl update req.query.build
        function callback() { //get list of all versions
            var files = [];
            App.findOne({
                name: req.query.name,
                platform: req.query.platform,
                releaseType: req.query.releaseType
            }, function(err, doc) {
                if (err || doc == null) {
                    console.log(err)
                } else {
                    files = doc.apps;
                    console.log(files);
                }
                files.push({
                    version: req.query.version,
                    build: req.query.build,
                    lastUpdated: req.query.lastUpdated,
                    size: req.query.size,
                    note: req.query.note
                })
                _callback();
            })

            function _callback() {
                var app = {
                    name: req.query.name,
                    platform: req.query.platform,
                    releaseType: req.query.releaseType,
                    apps: files
                }
                App.findOneAndUpdate({
                        name: req.query.name,
                        platform: req.query.platform,
                        releaseType: req.query.releaseType
                    }, app, {
                        upsert: true
                    },
                    function(err, docs) {
                        if (err)
                            console.log(err)
                        else
                            res.send(docs);
                    });
            }
        }
    }

}

module.exports = apps
