const mongoose = require('mongoose');
const {Schema} = mongoose;
const joi = require("joi");
const { string } = require('joi');

const UserSchema = new Schema({
  fullname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true
  }
})

const User = mongoose.model("user", UserSchema)


module.exports = User