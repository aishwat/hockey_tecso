var formidable = require('formidable');
var fs = require('fs');
var util = require('util');
var mkdirp = require('mkdirp');

var upload = {
    put: function(req, res) {
        var form = new formidable.IncomingForm();
        var _name, ext, build; //name_build.ext
        form.uploadDir = "./uploads/" + req.query.platform + '/' + req.query.name + '/' + req.query.version + '/';
        mkdirp.sync(form.uploadDir); //vl create if doesn't exists

        // console.log(form.uploadDir);
        form.on('fileBegin', function(name, file) {

            //rename the incoming file to the file's name
            // console.log('uploading: ' + file.name);
            var str = file.name.split(/[._]/);
            if (str.length == 2) //if build missing put build as 1// if 1 already exists it vl increment later
            {
                file.name = str[0] + '_' + '1' + '.' + str[1];
                str = file.name.split(/[._]/);
            }
            _name = str[0];
            build = str[1];
            ext = str[2];
            // console.log(file.name);

        })
        form.on('progress', function(bytesReceived, bytesExpected) {
            // console.log('bytesReceived: ' + bytesReceived);
        });
        form.on('error', function(err) {
            console.log('error: ' + err);
        });
        form.on('end', function() {
            console.log('finished');
        });
        form.on('file', function(field, file) { //file recevied
            console.log(file.path);
            fileRename(file, form, function(build) {
                console.log(build);
                req.query.build=build;
                res.status(200).send(file.name);
            });
        })
        form.parse(req, function(err, fields, files) {
            // console.log(util.inspect({
            //     fields: fields,
            //     files: files
            // }));
        });
    }
}

function fileExists(filePath) {
    try {
        return fs.statSync(filePath).isFile();
    } catch (err) {
        return false;
    }
}

function fileRename(file, form, callback) {
    var str;
    setTimeout(function() {
        if (fileExists(form.uploadDir + file.name)) {
            str = file.name.split(/[._]/);
            file.name = str[0] + '_' + (parseInt(str[1]) + 1) + '.' + str[2];
            fileRename(file, form, callback);
        } else {
            str = file.name.split(/[._]/);
            build = str[1]; //build global var
            fs.renameSync(file.path, form.uploadDir + file.name);
            callback(build);
        }
    }, 0)
}

module.exports = upload;
