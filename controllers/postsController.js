const express = require('express');
const postsService = require('../services/postsService');
const auth = require('../middleware/auth');

var router = express.Router();

router.get('/', auth, (req, res) => {
    postsService.getPosts(req,res);
});

router.get('/add', (req, res) => {
    res.render('posts/add');
});

router.post('/add', auth, (req,res) => {
    postsService.addPost(req,res);
});

module.exports = router;