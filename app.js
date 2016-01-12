var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

//config
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

//Delete & Edits
app.use(methodOverride('_method')); 

//Database setup
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var mongoUrl = "mongodb://localhost:27017/myDB";
var db;

MongoClient.connect(mongoUrl, function(err, database){
	if (err){
		console.log(err);
	}
	console.log("Saul B. Goodman!");
	db = database;
	process.on('exit', db.close);
})

//Middleware

app.use(function(req, res, next){
	console.log("body:", req.body, "params:", req.params, "query:", req.query);
	next();
});

//CRUD

//landing page
app.get('/', function(req, res){
	res.render('index');
});

//calendar page

app.get('/calendar', function(req, res){

	res.render('calendar');
});

app.get('/events', function(req, res){
	db.collection('events').find({}).toArray(function (err, result){
		res.send(result);
	});
	
});



app.listen(process.env.PORT || 3000);


