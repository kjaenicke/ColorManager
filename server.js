var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser')
var fs = require('fs');

//Build stuff
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')

//Express setup
var app = express();
app.use(express.static('dist'));
app.use(bodyParser.json());
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Webpack
var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

//Routes
app.get('/', function (req, res) {
  res.render('home');
});

app.get('/config', function(req, res){
  res.setHeader('Content-Type', 'application/json');

  fs.readFile('./config.json', 'utf8', function(err, data){
    if(err){
      res.send(500);
    }

    var config = JSON.parse(data);
    res.status(200).send(JSON.stringify(config, null, 3));
  });

});

app.post('/config', function(req, res){
  var newConfig = req.body;

  if(newConfig){
    fs.writeFile('config.json', JSON.stringify(newConfig), function (err) {
      if (err) {
        res.status(500).send('Error writing new config');
      }
      else {
        res.status(200).send('Config update successful');
      }
    });
  }
  else {
    res.status(500).send('Missing property "config"');
  }
});

var server = app.listen(3000, function () {
  var port = server.address().port;

  console.log('Example app listening at http://localhost:%s', port);
});
