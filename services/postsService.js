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
      .catch(() => {
        res.render('./confirmation',{ title: 'Posts', message: 'The operation failed', redirectTo:'/'});
      });
  },
  addPost: (req,res) => {
      Users.findById(req.userData.userId)
      .then(user => {
        if(!user){
          res.render('./confirmation',{ title: 'Add post', message: 'The User was not found', redirectTo:'/'});
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
              }else{
                res.render('./confirmation',{ title: 'Add post', message: 'The operation failed', redirectTo:'/posts/add'});
              }
            });
        }
      })
      .catch(() => {
        res.render('./confirmation',{ title: 'Add post', message: 'The operation failed', redirectTo:'/posts/add'})
      });
  },
  getPostById: (req,res) => {
    Posts.findById(req.params.postId)
    .then(post => {
      if(!post){
        res.render('./confirmation',{ title: 'Get post', message: 'The Post was not found', redirectTo:'/posts/list'});
      }else{
        var editPost = {
          _id: post._id,
          title: post.title,
          imageUrl: post.imageUrl,
          content: post.content,
          creator: post.creator.name
        };
        res.render('posts/edit', { post: editPost });
      }
    })
    .catch(() => {
      res.render('./confirmation',{ title: 'Get post', message: 'The operation failed', redirectTo:'/posts'})
    });
  },
  editPost: (req, res ) => {
    const postId = req.params.postId;
    const updateOps = {};

    for (const [key, value] of Object.entries(req.body)) {
      updateOps[key] = value;
    }

    Posts.updateOne({ _id: postId }, { $set: updateOps })
    .exec()
    .then(() => {
      res.render('./confirmation',{ title: 'Edit post', message: 'The Post was updated successfully', redirectTo:'/posts'})
    })
    .catch(() => {
      res.render('./confirmation',{ title: 'Edit post', message: 'The operation failed', redirectTo:'/posts'})
    });
  },
  deletePost:(req, res ) => {
    Posts.remove({ _id: req.params.postId })
    .exec()
    .then(() => {
      res.render('./confirmation',{ title: 'Delete post', message: 'The Post was deleted successfully', redirectTo:'/posts'})
    })
    .catch(() => {
      res.render('./confirmation',{ title: 'Delete post', message: 'The Operation failed', redirectTo:'/posts'})
    });
  }
}

module.exports = postsService;