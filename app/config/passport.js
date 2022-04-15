// Dependencies
const passport = require('passport');
const localStrategy = require('passport-local');

// custom Dependencies
const User = require('../models/user');
const _data = require('../lib/data');
const _validatePassword = require('../lib/validatePassword');

const customField = { // to reset the actual field
  usernameField: 'email',
  passwordField: 'password'

}

const verifiyCallback =  async(email, password, next) => {
  const user = await _data.findUserByEmailAsync(email, User).then(res => {return res});
  try {
    console.log(user)
    if(!user){
      return next("This e-mail address is not associated with any account", false)
    }
    const isMatch = _validatePassword.comparePassword(password, user.hash, user.salt)
    if(isMatch){
      return next(null, user)
    } else {
      return next("Incorrect password", false)
    };
  } catch(err) {
    return next(err, false)
  }
}

passport.use('locallogin', new localStrategy( customField, verifiyCallback))

passport.serializeUser((user, next) => {
  next(null, user)
})
passport.deserializeUser((user, next) => {
  next(null, user)
})

