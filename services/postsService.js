const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const Posts = mongoose.model('Posts');

const postsService = {
    getPosts: (req, res) => {
      Posts.find({ creator : req.userData.userId })
        .select("_id title imageUrl content creator")
        .populate("creator", "_id name")
        .exec()
        .then(posts => {
            var postList = posts.map(doc => {
                return {
                    _id: doc._id,
                    title: doc.title,
                    imageUrl: doc.imageUrl,
                    content: doc.content,
                    creator: doc.creator.name
                };
            })

            res.render('posts/list',{ posts: postList});
        })
        .catch(err => {
            res.render('./confirmation',{ title: 'Posts', message: 'The operation failed', redirectTo:'/'});
        });
    },
    addPost: (req,res) => {
        Users.findById(req.userData.userId)
        .then(user => {
          if(!user){
            res.render('./confirmation',{ title: 'Add post', message: 'User not found', redirectTo:'/users/signin'});
          }else{
              const post = new Posts({
                _id: mongoose.Types.ObjectId(),
                title: req.body.title,
                imageUrl: req.body.imageUrl,
                content: req.body.content,
                creator: req.userData.userId
              });
    
              post
              .save((err) => {
                if (!err){
                  res.render('./confirmation',{ title: 'Add post', message: 'The post was created succesfully', redirectTo:'/posts'});
                }
                else
                res.render('./confirmation',{ title: 'Add post', message: 'The operation failed', redirectTo:'/posts'});
                }
              );
          }
        })
      },
}

  
  module.exports = postsService;