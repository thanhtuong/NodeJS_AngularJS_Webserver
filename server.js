// server.js
var express = require('express'); // using express framework
var app = express();
var mongoose = require('mongoose'); // using mongoDB
var morgan = require('morgan'); // for log express4
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var database = require('./config/database.js')

// config
mongoose.connect(database.url); // connect mongoDB

// app.configure(function(){
    app.use(express.static(__dirname + '/public'));
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({'extended':'true'}));
    app.use(bodyParser.json());
    app.use(bodyParser.json({type:'application/vnd.api + json'}));
    app.use(methodOverride());
// });

// model 
var Todo = mongoose.model('Todo',{
	text : String,
    assigned_by: String,
    priority: String,
	done : false
});
// require('./app/models/todo.js');
// require('./app/routes.js')(app);
app.listen(8888);
console.log('App listening on port 8888');

//RESTful API
// //route

 	app.get('/api/todos', function(req, res) {

        // use mongoose to get all todos in the database
        Todo.find(function(err, todos) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(todos); // return all todos in JSON format
        });
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text : req.body.text,
            assigned_by: req.body.assigned_by,
            priority: req.body.priority,
            done : false
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });

    app.put('/api/todos/:_id',function(req,res){
        Todo.update({
            _id: req.params._id
        },{
            $set: {
                text:req.body.text,
                assigned_by: req.body.assigned_by,
                priority: req.body.priority
            }
        },function(err, todo){
            if(err)
                res.send(err);
             Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });


// app
// application
	app.get('*',function(req,res){
		res.sendfile('./public/index.html');
	});

