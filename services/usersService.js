const mongoose = require('mongoose');
const Users = mongoose.model('Users');

const usersService = {
    addUser: (req) => {
        const user = new Users({
            id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: req.body.password,
            name: req.body.name
          });

          user
          .save((err, doc) => {
            if (!err){
              return doc;
            }
            else
              return undefined;
            });
    }
  }
  
  module.exports = usersService;