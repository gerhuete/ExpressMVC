const express = require('express');
const usersService = require('../services/usersService');
var router = express.Router();

router.get('/signin', (req, res) => {
    res.render('users/signin');
});

router.post('/signin', (req,res) => {
    usersService.loginUser(req,res);
});

router.get('/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/signup', (req,res) => {
    usersService.addUser(req,res);
});

router.get('/logout', (req,res) => {
    usersService.logout(req,res);
});

module.exports = router;