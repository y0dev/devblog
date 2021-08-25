const Blog = require('../models/Blog.js');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const newBlog = (req, res) => {
    if (req.body.user) {
        console.log(req.body.user)
        const newBlog = new Blog({
            userEmail: req.body.user.email,
            title: req.body.title,
            information: req.body.information,
            coverPhoto: req.body.coverPhoto,
            coverPhotoURL: req.body.coverPhotoURL
        });
        if (req.body.videoId) {
            newBlog.videoId = req.body.videoId;
        }
        newBlog.save(function (err,blog) {
            if (err) throw err
            //  {
            //     console.log(err)
            //     //return res.status(401).json({ message: 'Blog failed to save.', err });
            // }
            
            return res.status(200).json({
                message: "Your blog was successfully saved!"
            });
        });
    }
    res.status(401).json({ message: 'No user found.' });
}
   

const getBlogs = (req,res) => {
    console.log(req.body)
    if(req.body.user) {
        Blog.find({ $or: [
            {'userEmail': { $regex : new RegExp(req.body.user.email, "i") }},
        ]}, (err,result) => {
            console.log(err)
            if (err) throw err
            console.log(result)
            res.send(result)
            return;
        });
        res.end();
    }
    return res.status(401).json({ message: 'No user signed in' })
}

const editBlog = (req,res) => {
    console.log(req.body)
    if(req.body.email) {
        Blog.find({ $or: [
            {'userEmail': { $regex : new RegExp(req.body.user.email, "i") }},
        ]}, (err,result) => {
            console.log(err)
            if (err) throw err
            console.log(result)
            return;
        });
        res.end();
    }
    return res.status(401).json({ message: 'No user signed in' })
}

module.exports = {
    newBlog,
    getBlogs,
    editBlog
}
