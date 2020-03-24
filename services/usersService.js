const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const usersService = {
    loginUser: (req, res) => {
      Users.findOne({ email : req.body.email }).exec().then(user => {
        if(!user){
          res.render('./confirmation',{ title: 'User Signin', message: 'Invalid Credentials', redirectTo:'/users/signin'});
        }else{
          bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (!result) {
              res.render('./confirmation',{ title: 'User Signin', message: 'Invalid Credentials', redirectTo:'/users/signin'});
            }else{
              let token = jwt.sign({ email: req.body.email, name: user.name, userId: user._id }, global.config.secretKey, {
                algorithm: global.config.algorithm,
                expiresIn: global.config.expiresIn
                });
                
                req.session.token=token;
                res.render('home',{ userName: user.name});
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
              res.render('./confirmation',{ title: 'User Signup', message: 'The operation failed', redirectTo:'/users/signup'});
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
                  res.render('./confirmation',{ title: 'User Signup', message: 'The user was created succesfully', redirectTo:'/users/signin'});
                }
                else
                res.render('./confirmation',{ title: 'User Signup', message: 'The operation failed', redirectTo:'/users/signup'});
                }
              );
            }
          });

        }else{
          //email is not available
          res.render('./confirmation',{ title: 'User Signup', message: 'The email is not available', redirectTo:'/users/signup'});
        }
      })
    },
    logout: (req,res) => {
      req.session.token=null;
      res.render('users/signin');
    }
  }
  
  module.exports = usersService;