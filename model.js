var Sequelize = require('sequelize-postgres').sequelize;
var postgres  = require('sequelize-postgres').postgres;
var sequelize = new Sequelize('nodetest', 'webby', null, {
	dialect: 'postgres',
	port: 5432
});

exports.Project = sequelize.define('User', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT
}, {timestamps: false});

exports.Sequelize = Sequelize;
exports.sequelize = sequelize;