# Module dependencies

express = require('express')
routes = require('./routes')
model = require('./model')
http = require('http')
path = require('path')
cas = require('grand_master_cas');
coffeekup = require 'coffeekup'

app = express();

# all environments
app.set('port', process.env.PORT || 3000)

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

app.use(express.favicon())
app.use(express.logger('dev'))
app.use(express.bodyParser())
app.use(express.methodOverride())
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router)

app.use require('connect-assets')()
app.use(express.static(path.join(__dirname, 'public')))

# auth using cas
cas.configure({
  casHost: "secure.its.yale.edu",
  casPath: "/cas",
  ssl: true,
  service: "http://localhost:3000"
})

# development only
if 'development' == app.get('env')
  app.use(express.errorHandler())

app.get('/', cas.bouncer, routes.index)

http.createServer(app).listen(app.get('port'), ->
  console.log('Express server listening on port ' + app.get('port')))
