const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const usersService = {
    loginUser: (req, res) => {
      Users.findOne({ email : req.body.email }).exec().then(user => {
        if(!user){
          res.render('users/confirmation',{ title: 'User Signin', message: 'Invalid Credentials'});
        }else{
          bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (!result) {
              res.render('users/confirmation',{ title: 'User Signin', message: 'Invalid Credentials'});
            }else{
              let token = jwt.sign({ email: req.body.email }, global.config.secretKey, {
                algorithm: global.config.algorithm,
                expiresIn: global.config.expiresIn
                });
                
                req.session.token=token;
                res.render('posts/postsList',{ token: token});
            }
          });
        }
      })
    }, 
    addUser: (req,res) => {
      Users.findOne({ email : req.body.email }).exec().then(user => {
        if(!user){
          //email is available

          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              res.render('users/confirmation',{ title: 'User Signup', message: 'The operation failed'});
            } else {
              const user = new Users({
                id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash,
                name: req.body.name
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