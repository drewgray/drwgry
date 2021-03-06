const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to DB
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

// On errors
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

//Initialize express
const app = express();

app.use(compression());

//user route
const users = require('./routes/users');

//car route
const cars = require('./routes/cars');

//blog route
const blogs = require('./routes/blogs');

//project route
const projects = require('./routes/projects');

//uploads route
const uploads = require('./routes/uploads');

//Port Number
const port = process.env.PORT || 8080;

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
app.use('/uploads', uploads);

// app.get('*.bundle.js', function(req, res, next) {
//     req.url = req.url + '.gz';
//     res.set('Content-Encoding', 'gzip');
//     next();
// });

//Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.use(function(req, res) {
    res.redirect('/');
});

// Start Server
const server = app.listen(port, () => {
    console.log('Server started on port ' + port);
});

server.timeout = 2000;