const { newBlog, getBlogs, editBlog } = require('../controllers/blog');

module.exports = (app) => {
  app.route('/api/create') 
  .post((req, res) => {
    newBlog(req,res);
  });

  app.route('/api/edit') 
    .post((req, res) => {
        editBlog(req,res);
  });

  app.post('/api/blogs', (req, res) => {
    getBlogs(req,res);
  });
}
