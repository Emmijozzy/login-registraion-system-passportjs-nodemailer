// Dependencies
require('dotenv').config();
const mongoose = require('mongoose');


const connect_db = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Mongo database connect successfully")
  } catch(err) {
    console.log(err, "Error in connection to Mongo database")
  }
}

module.exports = connect_db
