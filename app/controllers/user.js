// Dependencies
const flash = require('req-flash');
const passport = require('passport');

// custom dependencies
const _validatePassword = require('../lib/validatePassword')
const User = require('../models/user')
const _validateUserData = require('../lib/validateData')
const _data = require('../lib/data');
require('../config/passport');



// initialization of controller container
const controllers = {}

// registration controller
controllers.registration = async (req, res, next) => {
  try {
  const valRegData = await _validateUserData.RegData(req.body);
  console.log(valRegData, 'val')
  const {fullname, username, email, password} = valRegData;
  const genHashSalt = _validatePassword.genSaltHash(password);
  const salt = genHashSalt.salt;
  const hash = genHashSalt.hash;

    const user = await _data.findUserByEmailAsync(email, User).then(res => {return res});
    if(user) {
      throw ("This email is already used" )
    }
    else {
      let newUser = new User({
        fullname,
        username,
        email,
        salt,
        hash
      })
      await newUser.save()
      console.log("Registration data saved succesfully")
      req.flash('successMsg', 'Your are successfully registered \n login Your details')
    }
     res.redirect('/api/login')
  } catch(err) {
      console.log(err, "\n Error in registration")
     req.flash('errMsg', err)
     res.redirect('/api/register')
  }
}


// login controller
// controllers.login = passport.authenticate( 'locallogin', {failureRedirect: '/login', failureMessage: "Fail to authenticate", successRedirect: '/home' })
controllers.login = async (req, res, next) => {
  try {
    passport.authenticate('locallogin',
    (err, user, info) => {
      if (err) {
        // return next(err);
        req.flash('errMsg', err)
        return res.redirect('/api/login')
      }
      if (!user) {
        return res.redirect('/login')
      }
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        req.flash('successMsg', 'You have succesfully logged in')
        return res.redirect('/home');
      });
  
    })(req, res, next);
  } catch(err) {
    console.log(err)
    res.send("err")
  }
}


// registration page
controllers.regPage = (req, res) => {
  console.log(req.flash())
  res.send('Register Page')
}

// login page
controllers.loginPage = (req, res) => {
  console.log("login")
  res.send(req.flash())
}

module.exports = controllers