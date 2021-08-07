const mongoose = require('mongoose');
const bcrypt = require('bcrypt');const path = require("path");
require("dotenv").config({
  path: path.join(__dirname,"../../",".env")
});

const Schema = mongoose.Schema;
const conn = mongoose.connect(`mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`, {useNewUrlParser: true});

const ObjectId = Schema.ObjectId;

const users = new Schema({
  name: {
    type: String,
    required: 'Enter a name'
  },
  username: {
    type: String,
    required: 'Enter a username'
  },
  email: {
    type: String,
    required: 'Enter an email'
  },
  password: {
    type: String,
    required: 'Enter a password'
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

users.methods.comparePassword = (password, user_password) => {
  return bcrypt.compareSync(password,user_password);
}

const User = mongoose.model('User', users);

module.exports = User;
