var model = require('./model');

exports.index = function(req, res) {
  res.render('index');
};

exports.search = function(req, res) {
  model.sequelize.query('SELECT * FROM "Books" sort by createdAt limit 300',
  	model.Book).success(function(books) {
  		res.send(JSON.stringify(books))
  	})
};
