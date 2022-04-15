// Dependencies
const User = require('../models/user');
const Token = require('../models/token');
const {sendEmail} = require('../lib/sendEmail');
const validatePassword = require('../lib/validatePassword')
const crypto = require('crypto');
const Joi = require("joi");




// initialization of controller container
const controller = {};

// resetPassword
controller.passwordReset = async ( req, res ) => {
  const {email} = req.body;
  try {
    const schema = Joi.object({email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()});
    const {error} = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email: email});
    if(!user) return res.status(400).send('This email is associated with any account');

    let token = await Token.findOne({userId: user._id});
    if(!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex")
      }).save()
    }

    console.log(token)

    const msg = `<body>
    <h1 style="text-align: center; margin-bottom:0px;">Emmijozzy</h1>
    <h3 style="text-align: center;">Reset Password Link</h3>
    <p>Click on the following link to reset your password or copy the link to your browser</p>
    <a href="${process.env.BASE_URL}/password-reset/${user._id}/${token.token}"> ${process.env.BASE_URL}/password-reset/${user._id}/${token.token}</a>
  </body>`;

    const payload = {
      from: process.env.USER,
      to: user.email,
      subject: "Reset password link",
      html: msg
    }
    // send_email("logunsuyi@gmail.com", 'Reset of password', 'html', msg)

    await sendEmail(payload)
    res.send("password reset link sent to your email account");

  } catch(err) {
    console.log(err);
    res.send("An error occoured")
  }

}

controller.resetPasswordPage = async (req, res ) => {
  const form = '<h1>Login Page</h1><form method="POST" action="${process.env.BASE_URL}/reset-password/${user._id}/${token.token}">\
  <br>Enter Password:<br><input type="password" name="pw">\
  <br><br><input type="submit" value="Submit"></form>';
  res.send(form);
}



controller.resetWithToken = async (req, res) => {
  try {
    const {password} =  req.body;
    const schema = Joi.object({password: Joi.string().required()});
    const {error} = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.params.userId);
    if(!user) return res.status(400).send("invalid link or link expired")

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token
    });
    console.log(user)
    if(!token) return res.status(400).send("Idvalid link or expired");
    const {salt, hash} = validatePassword.genSaltHash(password)

    user.salt = salt;
    user.hash = hash;
    await user.save();
    await token.delete();

    res.send("Password reset sucessfully");
  } catch(err) {
    console.log("An error occured");
    console.log(err);
  }
}

module.exports = controller