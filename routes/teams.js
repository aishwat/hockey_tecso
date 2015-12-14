var App = require('./Models').App;
var Member = require('./Models').Member;
var Team = require('./Models').Team;

var teams = {
    get: function(req, res) {
        Team.find({}, function(err, docs) {
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
        Team.find(obj,
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
        Team.findOneAndRemove(obj,
            function(err, docs) {
                if (err)
                    console.log(err)
                else
                    res.send(docs);
            })
    },
    upsert: function(req, res) {
        var team = new Team({
            name: req.body.name,
            tag: req.body.tag,
            appMemberRoles: [{
                app: req.body.app,
                member: req.body.member,
                role: req.body.role
            }]
        });
        team.validate(function(err) {
            if (err) {
                console.log(err);
                res.send('invalid app or member');
            } else {
                var arr = [];
                Team.findOne({
                    name: req.body.name,
                    tag: req.body.tag
                }, function(err, doc) {
                    if (err || doc == null) {
                        console.log(err)
                    } else {
                        arr = doc.appMemberRoles;
                    }
                    arr.push({
                        app: req.body.app,
                        member: req.body.member,
                        role: req.body.role
                    })
                    _callback();
                })

                function _callback() {
                    var _team = {
                        name: req.body.name,
                        tag: req.body.tag,
                        appMemberRoles: arr
                    }

                    Team.findOneAndUpdate({
                            name: req.body.name,
                            tag: req.body.tag
                        }, _team, {
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
        })
    }

}

module.exports = teams
