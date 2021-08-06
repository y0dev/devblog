const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const user = require('../../routes/user');

const app = express();

app.use(cors()) // Use this after the variable declaration

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json({limit: '50mb'}));

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));

user(app);


app.listen(3600, () => {
  console.log(`Example app listening at http://localhost:3600`);
});
