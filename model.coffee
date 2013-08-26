Sequelize = require('sequelize-postgres').sequelize
postgres  = require('sequelize-postgres').postgres
sequelize = new Sequelize('nodetest', 'webby', null, {
	dialect: 'postgres',
	port: 5432
})

exports.Project = sequelize.define('Project', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT
}, {timestamps: false});

exports.Sequelize = Sequelize
exports.sequelize = sequelize