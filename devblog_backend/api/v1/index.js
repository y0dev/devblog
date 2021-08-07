const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const user = require('../../routes/user');
const blog = require('../../routes/blog');
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname,"../../../",".env")
});

const app = express();

app.use(cors()) // Use this after the variable declaration

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json({limit: '50mb'}));

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));

user(app);
blog(app);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.SERVER_PORT}`);
});
