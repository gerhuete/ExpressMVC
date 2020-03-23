const express = require('express');
const usersService = require('../services/usersService');
var router = express.Router();

router.get('/signin', (req, res) => {
    res.render('users/signin');
});

router.post('/signin', (req,res) => {
    usersService.loginUser(req.body,res);
});

router.get('/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/signup', (req,res) => {
    usersService.addUser(req.body,res);
});

router.get('/confirmation', (req, res) => {
    res.render('users/confirmation');
});

module.exports = router;