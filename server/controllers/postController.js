

const Post = require('../models/Post');
const mongoose = require('mongoose');


// get Post
const getPost = async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.postID.slice(1));
    const post = await Post
        .findOne({ _id: id })
        .catch(error => res.json({ message: error.message }));
    if (!post)
        res.status(401).json({ Message: "Post not found!" });

    res.json({ post });
}


// get Posts
const getPosts = async (req, res) => {
    const posts = await Post
        .find()
        .exec()
        .catch(error => res.json({ message: error.message }));

    res.json({ posts });
}


// add Post
const addPost = async (req, res) => {
    const data = req.body;
    await Post
        .create(data)
        .then(() => res.json({ message: "Post Created!" }))
        .catch(error => res.json({ message: error.message }));
}


// update Post
const updatePost = async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.postID.slice(1));
    await Post
        .findByIdAndUpdate(id, req.body)
        .then(() => res.json({ message: "Post updated!" }))
        .catch(error => res.json({ message: error.message }));
}


// delete Post
const deletePost = async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.postID.slice(1));
    await Post
        .findByIdAndDelete(id)
        .then(() => res.json({ message: "Post deleted!" }))
        .catch(error => res.json({ message: error.message }));
}



module.exports = {
    getPost,
    getPosts,
    addPost,
    updatePost,
    deletePost
}