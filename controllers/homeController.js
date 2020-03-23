const express = require('express');
const auth = require('../middleware/auth');

var router = express.Router();

router.get('/', auth, (req, res) => {
    res.render('home', { userName: req.body.name});
});

module.exports = router;