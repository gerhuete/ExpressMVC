const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const Posts = mongoose.model('Posts');
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
    .catch(() => {
      res.render('./confirmation',{ title: 'User Signin', message: 'The operation failed', redirectTo:'/users/signin'});
    });
  }, 
  addUser: (req,res) => {
    Users.findOne({ email : req.body.email }).exec().then(user => {
      if(!user){
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
                res.render('./confirmation',{ title: 'User Signup', message: 'The user was created succesfully', redirectTo:'/users/signin'});
              }
              else
              res.render('./confirmation',{ title: 'User Signup', message: 'The operation failed', redirectTo:'/users/signup'});
              }
            );
          }
        });

      }else{
        res.render('./confirmation',{ title: 'User Signup', message: 'The email is not available', redirectTo:'/users/signup'});
      }
    })
    .catch(() => {
      res.render('./confirmation',{ title: 'User Signup', message: 'The operation failed', redirectTo:'/users/signup'});
    });
  },
  logout: (req,res) => {
    req.session.token=null;
    res.render('users/signin');
  },
  updateUserPosts: (userId) => {
    Posts.find({ 'creator': userId }, '_id', function (err, posts) {  
      Users.updateOne({ _id: userId }, { $set: { posts: posts } })
      .exec()
    });
  }
}

module.exports = usersService;