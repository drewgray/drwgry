const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
var formidable = require('formidable');
var fs = require('fs');
var gcs = require('@google-cloud/storage')({
    projectId: 'drwgry-proj',
    keyFilename: './config/drwgry-proj-00d1e69a420b.json'
});
var bucket = gcs.bucket('assets.drwgry.com');

// Connect to DB
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

// On error
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

//Initialize express
const app = express();

//user route
const users = require('./routes/users');

//car route
const cars = require('./routes/cars');

//blog route
const blogs = require('./routes/blogs');

//project route
const projects = require('./routes/projects');

//Port Number
const port = 3001;

//CORS Middleware
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/cars', cars);
app.use('/blogs', blogs);
app.use('/projects', projects);

app.post('/upload', function(req, res) {
    var files;
    var fileURLs;
    // create an incoming form object
    var form = new formidable.IncomingForm();

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '/uploads');

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
        console.log(files);
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

//Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.use(function(req, res) {
    res.redirect('/');
});

// Start Server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});