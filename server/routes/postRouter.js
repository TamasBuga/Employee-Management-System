

const express = require("express");
const router = express.Router();
const { getPost, getPosts, addPost, updatePost, deletePost } = require('../controllers/postController');



router.get('/:postID', getPost);

router.get('/', getPosts);

router.post('/add-post', addPost);

router.put('/:postID', updatePost);

router.delete('/:postID', deletePost);


module.exports = router;


