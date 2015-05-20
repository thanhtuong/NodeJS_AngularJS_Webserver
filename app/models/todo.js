var mongoose = require('mongoose');
var Todo = mongoose.model('Todo',{
	text : String,
    assigned_by: String,
    priority: String,
	done : false
});
console.log(Todo);