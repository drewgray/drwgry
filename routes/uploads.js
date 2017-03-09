const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
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
            console.log(err);
            res.json({ success: false, msg: 'Images not uploaded', urls: '' });
        });

        stream.on('finish', () => {
            req.file.cloudStorageObject = gcsname;
            req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
            res.json({ success: true, msg: 'Images uploaded', urls: req.file.cloudStoragePublicUrl });
        });

        stream.end(req.file.buffer);

    });

//Upload document
router.post('/doc',
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