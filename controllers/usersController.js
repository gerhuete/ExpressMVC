const express = require('express');
const mongoose = require('mongoose');

var router = express.Router();

const Users = mongoose.model('Users');

module.exports = router;