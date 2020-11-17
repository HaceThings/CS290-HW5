//Setting up express
var express = require('express');
var app = express();

//Setting up express-handlebars
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 55455);

//Setting up bodyParser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Function to pull parameters from get request
function GetRequestParameters(req){
  var nameValueArray = [];
  for (var param in req.query){
    nameValueArray.push({'name':param,'value':req.query[param]})
  }
  return nameValueArray;
}

//Function to pull body parameters from post request
function PostRequestParameters(req){
  var nameValueArray = [];
  for (var param in req.body){
    nameValueArray.push({'name':param,'value':req.body[param]})
  }
  return nameValueArray;
}

app.post('/home',function(req,res){
  var post_req = {};
  post_req.post = 'POST Request Received';
  post_req.getParams = GetRequestParameters(req);
  post_req.postParams = PostRequestParameters(req);
  res.render('home', post_req);
});

app.get('/home',function(req,res){
  var get_req = {};
  get_req.get = 'GET Request Received';
  get_req.getParams = GetRequestParameters(req);
  res.render('home', get_req);
});

//Handle any non-specified routes
app.use(function(req,res){
  res.status(404);
  res.render('404');
});

//Handle any syntax issues
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

//Start server
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
