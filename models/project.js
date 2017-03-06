const mongoose = require('mongoose');
const config = require('../config/database');

//User Schema
const ProjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    logopath: {
        type: String,
    },
    details: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

const Project = module.exports = mongoose.model('Project', ProjectSchema);

module.exports.getProjectById = function(id, callback) {
    Project.findById(id, callback);
}

module.exports.getProjectByProjectname = function(projectname, callback) {
    const query = { name: projectname }
    Project.findOne(query, callback);
}

module.exports.getAllProjects = function(data, callback) {
    Project.find(callback);
}

module.exports.addCar = function(newProject, callback) {
    newProject.save(callback);
}

module.exports.deleteProject = function(id, callback) {
    Project.remove({ _id: id }, callback);
}