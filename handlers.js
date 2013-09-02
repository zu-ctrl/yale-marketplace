var model = require('./model');

exports.index = function(req, res) {
  res.render('index');
};

exports.booksearch = function(req, res) {
  var apiReturn = function (data) {
  	res.send(JSON.stringify(data));
  };
  if (!req.query.q) {
  	model.Book.findAll({
  		order: '"createdAt" DESC',
  		limit: 300
  	}).success(apiReturn);
  } else {
  	var q = req.query.q;
	var separator = /(.+?)( [^ ]+)?$/;
	var results = separator.exec(q);
	if (results[2]) {
		model.sequelize.query("select * FROM searchquery(plainto_tsquery('english', ?) || to_tsquery(?))", 
		model.Book, null, [results[1], results[2] + ':*']).success(apiReturn);
    } else {
    	model.sequelize.query("select * FROM searchquery(to_tsquery(?))", model.Book, null,
    	[results[1] + ':*', q]).success(apiReturn);
    };
  };
};

