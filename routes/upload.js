var formidable = require('formidable');
var form = new formidable.IncomingForm();
var fs = require('fs');
var util = require('util');

var upload = {
    put: function(req, res) {
        var _name, ext, ver; //name_ver.ext

        form.uploadDir = "./uploads/";
        // form.keepExtensions = true;
        form.on('fileBegin', function(name, file) {
            //rename the incoming file to the file's name
            console.log('uploading: ' + file.name);
            var str = file.name.split(/[._]/);
            if (str.length == 2) //version missing
            {
                str.splice(1, 0, '1');
            }
            _name = str[0];
            ver = str[1];
            ext = str[2];
            console.log(_name+ver+ext);

        })
        form.on('progress', function(bytesReceived, bytesExpected) {
            console.log('bytesReceived: ' + bytesReceived);
        });
        form.on('error', function(err) {
            console.log('error: ' + err);
        });
        form.on('end', function() {
            console.log('finished');
            res.send('done');
        });
        form.on('file', function(field, file) { //file recevied
            console.log('');
            fs.stat(form.uploadDir + "/" + file.name, function(err, stats) {
                if (err && err.code !== 'ENOENT') {
                    console.log(err)
                } else if (err && err.code === 'ENOENT') { //new file
                    fs.rename(file.path, form.uploadDir + "/" + _name + '_' + ver + '.' + ext);
                    //check cyclic version
                } else { //rename
                    // console.log('1: '+file.path);
                    // console.log('2: '+form.uploadDir + "/" + file.name);
                    fs.rename(file.path, form.uploadDir + "/" + _name + '_' + (parseInt(ver) + 1) + '.' + ext);
                }

            });


        })
        form.parse(req, function(err, fields, files) {
            console.log(util.inspect({
                fields: fields,
                files: files
            }));
        });
    }
}

module.exports = upload;
