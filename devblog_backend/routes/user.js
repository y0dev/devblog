const { loginRequired, register, login, signOut } = require('../controllers/user');

module.exports = (app) => {
  app.route('/api/register') 
  .post((req, res) => {
    register(req,res);
  });

  app.route('/api/login') 
    .post((req, res) => {
      login(req,res);
  });

  app.get('/api/signOut', (req, res) => {
    signOut(req,res);
  });
}
