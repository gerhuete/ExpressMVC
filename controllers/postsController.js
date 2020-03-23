const express = require('express');
const postsService = require('../services/postsService');
var router = express.Router();

router.get('/postsList', (req, res) => {
    res.render('posts/postsList');
});

module.exports = router;