var express = require('express');
var router = express.Router();
var upload=require('./upload');
var devices=require('./devices');
var members=require('./members');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/device/:key/:val',devices.getByKeyVal);
router.get('/device',devices.get);
router.post('/device', devices.upsert);
router.delete('/device/:key/:val',devices.deleteByKeyVal);

router.get('/member/:key/:val',members.getByKeyVal);
router.get('/member',members.get);
router.post('/member', members.upsert);
router.delete('/member/:key/:val',members.deleteByKeyVal);


router.post('/upload',upload.put);


module.exports = router;
