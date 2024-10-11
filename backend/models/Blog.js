// models/Blog.js

const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100,
    },
    content: {
        type: String,
        required: true,
        minlength: 5,
    },
    author: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;