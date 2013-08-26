model = require('../model')

exports.index = (req, res)->
  model.sequelize.query('SELECT * FROM "Projects"', model.Project).success((projects)->
      res.render('index', {
        title: 'Express',
        thething: projects}))