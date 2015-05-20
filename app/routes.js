var Todo = require('./models/todo.js');
console.log(Todo);
module.exports = function(app){
	console.log('GOING TO ROUTES_2.JS');
	// get todos
	app.get('/api/todos', function(req,res){
		 // use mongoose to get all todos in the database
		console.log(Todo);
        Todo.find(function(err, todos) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(todos); // return all todos in JSON format
        });
	});
	// create 
	app.post('/api/todos', function(req,res){
 	console.log('CREATE SUCCESSFULL');
		Todo.create({
			text : req.body.text,
            assigned_by: req.body.assigned_by,
            priority: req.body.priority,
            done : false
		},function(err,todo){
			if(err)
				res.send(err);
			Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
		});
	});

	// delete 
	app.delete('/api/todos/:todo_id', function(req,res){
		Todo.remove({
			_id : req.params.todo_id
		},function(err,todo){
			if(err)
				res.send(err);
			Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
		});
	});

	// application
	app.get('*', function(req,res){
		res.sendfile('./public/index.html');
	});
};