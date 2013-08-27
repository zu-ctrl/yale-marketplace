var model = require('./model');

exports.index = function(req, res) {
  model.sequelize.query('SELECT * FROM "Projects"', model.Project).success(function(projects) {
      res.render('index', {
        title: 'Do it Yale',
        thelist: projects})})
};

exports.list = function(req, res) {
  res.send(JSON.stringify(
    [{description: 'The book', class: 'cs323', price: '$3'}]))
};