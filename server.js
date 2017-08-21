var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var webpackDev = require('webpack-dev-middleware');
var webpackHot = require('webpack-hot-middleware');
var webpack = require('webpack');

var webpackConfig = require('./webpack.config');

var app = express();
var compile = webpack(webpackConfig);

app.use(webpackDev(compile));
app.use(webpackHot(compile));

app.set(bodyParser.urlencoded({ extended: true }));
app.set(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.set(express.static(path.join(__dirname, 'public')));

app.use('/*', function(req, res, next){
  res.render('index', { title: 'Zombieee' });
});

app.use(logger('dev'));

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function(){
  console.log('Server running on port 127.0.0.1:3000');
})
