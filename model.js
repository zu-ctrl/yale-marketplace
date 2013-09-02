var Sequelize = require('sequelize');
var indices = require('./indices');

var sequelize = new Sequelize('nodetest', 'webby', null, {
	dialect: 'postgres',
	port: 5432
});

exports.User = sequelize.define('User', {
  netid: {type: Sequelize.STRING, primaryKey: true},
  imported: Sequelize.BOOLEAN,
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
  quantity: Sequelize.INTEGER,
  titlevector: 'TSVECTOR',
  authorvector: 'TSVECTOR',
  coursevector: 'TSVECTOR'
});

exports.Owner = sequelize.define('Owner', {
  userid: {type: Sequelize.STRING, references: "Users", referencesKey: "netid"},
  bookid: {type: Sequelize.STRING(13), references: "Books", referencesKey: "isbn"},
});

sequelize.sync().success(function() {
  indices.indexMigrate(sequelize, "title_gin_idx", 'ON "Books" USING GIN(titlevector);');
  indices.indexMigrate(sequelize, "author_gin_idx", 'ON "Books" USING GIN(authorvector);');
  indices.indexMigrate(sequelize, "course_gin_idx", 'ON "Books" USING GIN(coursevector);');

  indices.triggerMigrate(sequelize, "tsvectortitleupdate",
  "BEFORE INSERT OR UPDATE ON \"Books\" \
    FOR EACH ROW EXECUTE PROCEDURE \
      tsvector_update_trigger('titlevector', 'pg_catalog.english', 'title');");
  indices.triggerMigrate(sequelize, "tsvectorauthorupdate",
  "BEFORE INSERT OR UPDATE ON \"Books\" \
    FOR EACH ROW EXECUTE PROCEDURE \
      tsvector_update_trigger('authorvector', 'pg_catalog.english', 'author');");
  indices.triggerMigrate(sequelize, "tsvectorcourseupdate",
  "BEFORE INSERT OR UPDATE ON \"Books\" \
    FOR EACH ROW EXECUTE PROCEDURE \
      tsvector_update_trigger('coursevector', 'pg_catalog.english', 'course');");

  sequelize.query("CREATE OR REPLACE FUNCTION \
    searchquery(q TSQUERY) RETURNS SETOF \"Books\" AS \
    $BODY$ \
    BEGIN RETURN QUERY SELECT * FROM \"Books\" \
    where titlevector @@ q or authorvector @@ q or coursevector @@ q \
    limit 300; END\
    $BODY$ \
    LANGUAGE 'plpgsql' ;");
}).error(function(error){
  console.log("Could not sync");
});

exports.Sequelize = Sequelize;
exports.sequelize = sequelize;