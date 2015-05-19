// server.js

var express=require('express');
var app=express();
var mongoose=require('mongoose');
var morgan=require('morgan');
var bodyParser=require('body-parser');
var methodOverride=require('method-override');

// config
mongoose.connect('mongodb://127.0.0.1:27017/angularJSDM');
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());

app.listen(8888);
console.log('App listening on port 8888');

