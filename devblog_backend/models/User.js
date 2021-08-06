const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const conn = mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true});

const ObjectId = Schema.ObjectId;

const users = new Schema({
  name: {
    type: String,
    required: 'Enter a name'
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
