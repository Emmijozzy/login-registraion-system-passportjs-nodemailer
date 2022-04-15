// Dependencies
const User = require('../models/user');

// initialization of lib container
const lib = {};


lib.findUserByEmail = (email, User,  callback) => {
  User.findOne({email: email}, (err, user) => {
    if(err) {
      return console.log(err, "Unable to find user")
      callback(false)
    } else {
      callback(user)
    }
  })
}

lib.findUserByEmailAsync = async (email, User) => {
  try {
      const user = User.findOne({email: email});
      if(!user) {
        console.log('No user found with this email');
        return false 
      } else {
        // console.log(user, "from data.js")
        return user
      }      
  } catch(err) {
    console.log(err)
  }
}

// export of module
module.exports = lib;