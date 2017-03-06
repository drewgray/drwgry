const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Blog = require('../models/blog');

//Add Blog
router.post('/add', (req, res, next) => {
    let newBlog = new Blog({
        name: req.body.name,
        bodytext: req.body.bodytext,
        bodyhtml: req.body.bodyhtml,
        creationDate: Date.now(),
        tags: req.body.tags,
        author: req.body.author
    });

    Blog.getBlogByBlogname(newBlog.name, (err, blog) => {
        if (err) throw err;
        if (blog) {
            return res.json({ success: false, msg: 'Blog name already taken' });
        } else {
            Blog.addBlog(newBlog, (err, blog) => {
                if (err) {
                    res.json({ success: false, msg: 'Failed to add blog post' });
                } else {
                    res.json({ success: true, msg: 'Blog post added' });
                }
            });
        }
    });
});

//get all blog
router.get('/all', (req, res, next) => {
    Blog.getAllBlogs('', (err, blogs) => {
        if (err) throw err;
        if (blogs) {
            res.json({ success: true, blogs: blogs });
        } else {
            res.json({ success: false, blogs: '' });
        }
    });
});

//delete post
router.post('/delete', (req, res, next) => {
    Blog.getBlogById(req.body._id, (err, blog) => {
        if (err) throw err;
        if (blog) {
            Blog.deleteBlog(blog._id, (err, result) => {
                if (err) { console.log(err); }
                res.json({ success: true });
            });
        } else {
            res.json({ success: false });
        }
    });
});


module.exports = router;