const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const usersService = {
    addUser: (req,res) => {
      Users.findOne({ email : req.email }).exec().then(user => {
        if(!user){
          //email is available

          bcrypt.hash(req.password, 10, (err, hash) => {
            if (err) {
              res.render('users/confirmation',{ title: 'User Signup', message: 'The operation failed'});
            } else {
              const user = new Users({
                id: new mongoose.Types.ObjectId(),
                email: req.email,
                password: hash,
                name: req.name
              });
    
              user
              .save((err) => {
                if (!err){
                  //user saved
                  res.render('users/confirmation',{ title: 'User Signup', message: 'The user was created succesfully'});
                }
                else
                res.render('users/confirmation',{ title: 'User Signup', message: 'The operation failed'});
                }
              );
            }
          });

        }else{
          //email is not available
          res.render('users/confirmation',{ title: 'User Signup', message: 'The email is not available'});
        }
      })
    }
  }
  
  module.exports = usersService;