var express = require('express');
var router = express.Router();
var upload = require('./upload');
var devices = require('./devices');
var members = require('./members');
var apps = require('./apps');
var teams = require('./teams');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});
router.get('/device/:key/:val', devices.getByKeyVal);
router.get('/device', devices.get);
router.post('/device', devices.upsert);
router.delete('/device/:key/:val', devices.deleteByKeyVal);

router.get('/member/:key/:val', members.getByKeyVal);
router.get('/member', members.get);
router.post('/member', members.upsert);
router.delete('/member/:key/:val', members.deleteByKeyVal);

router.get('/app/:key/:val', apps.getByKeyVal);
router.get('/app', apps.get);
router.post('/app', apps.upsert); //from query
router.delete('/app/:key/:val', apps.deleteByKeyVal);

router.get('/team/:key/:val', teams.getByKeyVal);
router.get('/team', teams.get);
router.post('/team', teams.upsert); //from query
router.delete('/team/:key/:val', teams.deleteByKeyVal);

router.post('/upload', upload.put);


module.exports = router;
