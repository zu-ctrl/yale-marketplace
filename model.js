exports.Sequelize = require('sequelize');

exports.sequelize = new exports.Sequelize('nodetest', 'webby', null, {
	dialect: 'postgres',
	port: 5432
});
