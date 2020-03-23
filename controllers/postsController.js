const express = require('express');
const postsService = require('../services/postsService');
const auth = require('../middleware/auth');

var router = express.Router();

router.get('/postsList', auth, (req, res) => {
    res.render('posts/postsList');
});

module.exports = router;