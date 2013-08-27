var Sequelize = require('sequelize-postgres').sequelize;
var postgres  = require('sequelize-postgres').postgres;
var sequelize = new Sequelize('nodetest', 'webby', null, {
	dialect: 'postgres',
	port: 5432
});

exports.User = sequelize.define('User', {
  netid: {type: Sequelize.STRING, primaryKey: true},
  name: Sequelize.STRING,
  address: Sequelize.STRING,
  email: Sequelize.STRING,
  phone: Sequelize.STRING,
}, {timestamps: false});

exports.Book = sequelize.define('Book', {
  isbn: {type: Sequelize.STRING(13), primaryKey: true},
  title: Sequelize.STRING,
  author: Sequelize.STRING,
  edition: Sequelize.STRING,
  course: Sequelize.STRING,
  quantity: Sequelize.INTEGER
});

exports.Owner = sequelize.define('Owner', {
  userid: {type: Sequelize.STRING, references: "User", referencesKey: "netid"},
  bookid: {type: Sequelize.STRING(13), references: "Book", referencesKey: "isbn"},
});

exports.Sequelize = Sequelize;
exports.sequelize = sequelize;