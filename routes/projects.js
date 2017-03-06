const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Project = require('../models/project');

//Add Project
router.post('/add', (req, res, next) => {
    let newProject = new Project({
        name: req.body.name,
        logopath: req.body.logopath,
        details: req.body.details,
        url: req.body.url
    });

    Project.getProjectByProjectname(newProject.name, (err, project) => {
        if (err) throw err;
        if (project) {
            return res.json({ success: false, msg: 'project name already taken' });
        } else {
            Project.addProject(newProject, (err, project) => {
                if (err) {
                    res.json({ success: false, msg: 'Failed to add project' });
                } else {
                    res.json({ success: true, msg: 'project added' });
                }
            });
        }
    });
});

//get all projects
router.get('/all', (req, res, next) => {
    Project.getAllProjects('', (err, projects) => {
        if (err) throw err;
        if (projects) {
            res.json({ success: true, projects: projects });
        } else {
            res.json({ success: false, projects: '' });
        }
    });
});

//delete project
router.post('/delete', (req, res, next) => {
    Car.getProjectById(req.body._id, (err, project) => {
        if (err) throw err;
        if (project) {
            Car.deleteProject(project._id, (err, result) => {
                if (err) { console.log(err); }
                res.json({ success: true });
            });
        } else {
            res.json({ success: false });
        }
    });
});

module.exports = router;