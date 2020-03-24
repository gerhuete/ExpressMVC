const express = require('express');
const postsService = require('../services/postsService');
const auth = require('../middleware/auth');

var router = express.Router();

router.get('/', auth, (req, res) => {
    postsService.getPosts(req,res);
});

router.get('/add', auth, (req, res) => {
    res.render('posts/add');
});

router.post('/add', auth, (req,res) => {
    postsService.addPost(req,res);
});

router.get('/edit/:postId', auth, (req, res) => {
    postsService.getPostById(req, res);
});

router.post('/edit/:postId', auth, (req,res) => {
    postsService.editPost(req,res);
});

router.get('/delete/:postId', auth, (req,res) => {
    postsService.deletePost(req,res);
});

module.exports = router;