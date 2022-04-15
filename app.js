// Dpendencies 
const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const flash = require('req-flash')
const MongoStore = require('connect-mongo')


const mongo_db = require('./app/database')
const userRoutes = require('./app/routes/user');
const indexRoutes = require('./app/routes/index');
const resetPasswordRoute = require('./app/routes/passwordReset')

// Middleware
app.use(helmet())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

// session config
app.use( session( {
  secret: 'Emmijozzy360',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ 
    mongoUrl: process.env.MONGO_URI,
    ttl:  60*60*24, // Time to live
    autoRemove: 'native'
   }),
  cookie: {maxAge: 1000 * 60 * 60 * 24 }
}));

// connect flash
app.use(flash());

// passport authentication
require('./app/config/passport');

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(req.session, "session data");
  // console.log(req.user, "from app use")
  next()
})




// load router
// user
app.use('/api', userRoutes);

// index
app.use('/', indexRoutes);

// reset password
app.use('/api/reset-password', resetPasswordRoute);





const port = process.env.PORT || 8080
mongo_db()
  .then(() => {
    app.listen(port, () => {
      console.log(`App is listening to port: ${port}`)
    })
  })
