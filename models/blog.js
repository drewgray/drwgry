const mongoose = require('mongoose');
const config = require('../config/database');

//User Schema
const BlogSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bodytext: {
        type: String,
        required: true
    },
    bodyhtml: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        required: true
    },
    tags: [{
        type: String
    }],
    author: {
        type: String
    }
});

const Blog = module.exports = mongoose.model('Blog', BlogSchema);

module.exports.getBlogById = function(id, callback) {
    Blog.findById(id, callback);
}

module.exports.getBlogByBlogname = function(blogname, callback) {
    const query = { name: blogname }
    Blog.findOne(query, callback);
}

module.exports.getAllBlogs = function(data, callback) {
    Blog.find(callback);
}

module.exports.addBlog = function(newBlog, callback) {
    newBlog.save(callback);
}

module.exports.deleteBlog = function(id, callback) {
    Blog.remove({ _id: id }, callback);
}