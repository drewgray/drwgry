const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
var formidable = require('formidable');
var fs = require('fs');
var gcs = require('@google-cloud/storage')({
    projectId: config.GCLOUD_PROJECT
        // keyFilename: config.keyfile
});
var bucket = gcs.bucket(config.CLOUD_BUCKET);
const Multer = require('multer');
const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 5 * 1024 * 1024 // no larger than 5mb
    }
});

//Upload image
router.post('/img',
    multer.single('inputFile'),
    function(req, res, next) {

        const gcsname = Date.now() + req.file.originalname;
        const file = bucket.file(gcsname);

        const stream = file.createWriteStream({
            metadata: {
                contentType: req.file.mimetype
            }
        });

        stream.on('error', (err) => {
            req.file.cloudStorageError = err;
            res.json({ success: false, msg: 'Images not uploaded', urls: '' });
        });

        stream.on('finish', () => {
            req.file.cloudStorageObject = gcsname;
            req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
            res.json({ success: true, msg: 'Images uploaded', urls: req.file.cloudStoragePublicUrl });
        });

        stream.end(req.file.buffer);

        // // create an incoming form object
        // var form = new formidable.IncomingForm();

        // // specify that we want to allow the user to upload multiple files in a single request
        // form.multiples = true;

        // // store all uploads in the /uploads directory
        // form.uploadDir = path.join(__dirname, '/../temp');

        // form.maxFieldsSize = 4 * 1024 * 1024;



        // // every time a file has been uploaded successfully,
        // // rename it to it's orignal name
        // form.on('file', function(field, file) {
        //     var newname = Date.now() + file.name;
        //     fs.rename(file.path, path.join(form.uploadDir, newname));
        //     files = newname;
        // });

        // // log any errors that occur
        // form.on('error', function(err) {
        //     console.log('An error has occured: \n' + err);
        // });

        // // once all the files have been uploaded, send a response to the client
        // form.on('end', function() {
        //     bucket.upload(path.join(form.uploadDir, files), function(err, gfile) {
        //         if (!err) {
        //             fs.unlink(path.join(form.uploadDir, files), function(err) {});
        //             fileURLs = 'http://assets.drwgry.com/' + files;
        //             res.json({ success: true, msg: 'Images uploaded', urls: fileURLs });
        //         } else {
        //             console.log(err);
        //             res.json({ success: false, msg: 'Images not uploaded', urls: fileURLs });
        //         }
        //     });
        // });

        // // parse the incoming request containing the form data
        // form.parse(req);

    });

//Upload document
router.post('/doc', function(req, res, next) {
    var files;
    var fileURLs;
    // create an incoming form object
    var form = new formidable.IncomingForm();

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '/../temp');
    form.maxFieldsSize = 4 * 1024 * 1024;

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function(field, file) {
        var newname = Date.now() + file.name;
        fs.rename(file.path, path.join(form.uploadDir, newname));
        files = newname;
    });

    // log any errors that occur
    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {
        bucket.upload(path.join(form.uploadDir, files), function(err, gfile) {
            if (!err) {
                fs.unlink(path.join(form.uploadDir, files), function(err) {});
                fileURLs = 'http://assets.drwgry.com/' + files;
                res.json({ success: true, msg: 'Images uploaded', urls: fileURLs });
            } else {
                console.log(err);
                res.json({ success: false, msg: 'Images not uploaded', urls: fileURLs });
            }
        });
    });

    // parse the incoming request containing the form data
    form.parse(req);
});

router.post('/deleteimg', function(req, res, next) {
    bucket.file(req.body.url).delete((err, resp) => {
        if (!err) {
            res.json({ success: true, msg: 'Image deleted' });
        } else {
            console.log(err);
            res.json({ success: false, msg: 'error' });
        }
    });

});

router.post('/deletedoc', function(req, res, next) {
    bucket.file(req.body.url).delete((err, resp) => {
        if (!err) {
            res.json({ success: true, msg: 'Document deleted' });
        } else {
            console.log(err);
            res.json({ success: false, msg: 'error' });
        }
    });
});

function getPublicUrl(filename) {
    return `http://assets.drwgry.com/${filename}`;
}


module.exports = router;