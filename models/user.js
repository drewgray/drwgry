const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
var datastore = require('@google-cloud/datastore')({
    projectId: config.GCLOUD_PROJECT,
    keyFilename: config.keyfile
});

//User Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tmpPW: {
        type: Boolean,
        required: false
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'temp', 'admin', 'guest', 'blocked']
    },
    creationDate: {
        type: Date,
        required: false
    },
    lastLogin: {
        type: Date,
        required: false
    },
    toDos: [{
        name: String,
        toDo_id: {
            type: mongoose.Schema.Types.ObjectId,
            index: true
        },
        done: Boolean
    }]
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback) {
    const query = { username: username }
    User.findOne(query, callback);
}

module.exports.getAllUsers = function(data, callback) {
    User.find(callback);
}

module.exports.getUserByEmail = function(email, callback) {
    const query = { email: email }
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.updateLastLogin = function(user, callback) {
    user.lastLogin = Date.now();
    user.save(callback);
}

module.exports.updateRole = function(user, role, callback) {
    user.role = role;
    user.save(callback);
}

module.exports.deleteUser = function(id, callback) {
    User.remove({ _id: id }, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}