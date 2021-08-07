const mongoose = require('mongoose');
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname,"../",".env")
});
const Schema = mongoose.Schema;
const conn = mongoose.connect(`mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`, {useNewUrlParser: true});

const ObjectId = Schema.ObjectId;

const blog = new Schema({
  userEmail: {
      type: String,
      require: "Needs a user email"
  },
  title: {
    type: String,
    required: 'Need a title'
  },
  information: {
    type: String,
    required: 'Need to input information'
  },
  coverPhoto: {
    type: String,
    required: 'Need a photo'
  },
  coverPhotoURL: {
    type: String,
    required: 'Need a photo url'
  },
  youtubeId: String,
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

const Blog = mongoose.model('Blog', blog);

module.exports = Blog;
