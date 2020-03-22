const express = require('express');
const usersService = require('../services/usersService');
var router = express.Router();

router.get('/signin', (req, res) => {
    res.render('users/signin');
});

/*router.post('/signin', (req,res) => {
    usersService.addUser(req,res);
});*/

router.get('/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/signup', (req,res) => {
    var result = usersService.addUser(req);

    if (typeof(result) !== undefined){
        res.status(201).render('users/confirmation',{ title: 'User Signup', message: 'The user was created succesfully'});
    }else{
        res.status(201).render('users/confirmation',{ title: 'User Signup', message: 'There was an error creating the user'});
    }
});

router.get('/confirmation', (req, res) => {
    res.render('users/confirmation');
});

module.exports = router;