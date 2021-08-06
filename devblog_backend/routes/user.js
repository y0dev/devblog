const { loginRequired, register, login, signOut } = require('../controllers/user');

module.exports = (app) => {
  app.route('/signUp') 
  .post((req, res) => {
    register(req,res);
  });

  app.route('/login') 
    .post((req, res) => {
      login(req,res);
  });

  app.get('/signOut', (req, res) => {
    console.log(req.session);
    signOut(req,res);
  });
}
