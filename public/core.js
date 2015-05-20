var todoApp = angular.module('todoApp',['ui.router']);

todoApp.config(function($stateProvider,$urlRouterProvider){
	$urlRouterProvider.otherwise('/home'); // any request mismatch will get into /home
	$stateProvider
		.state('listTodo',{
			url: '/listTodo',
			templateUrl: 'listTodoDetail.html',
			controller: 'mainController'
		})
		.state('home',{
			url:'/home',
			templateUrl: 'createTodo.html',
			controller: 'mainController'
		});
});
todoApp.factory('storeDataService',function(){
	var formData = {
		text: '',
		assigned_by: '',
		priority: ''
	}
	return formData;
});
todoApp.controller('mainController', function($scope,$http,storeDataService){
	$scope.formData = {};
	$scope.addButon = "Add";

	$http.get('/api/todos')
		.success(function(data){
			$scope.todos = data;
			console.log(data);
		})
		.error(function(data){
			console.log('Error: ' + data);
		});

	$scope.createTodo = function(){
		$http.post('/api/todos',$scope.formData)
			.success(function(data){
				$scope.formData = {};
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error: '+data);
			});
	};

	// delete

	$scope.deleteTodo = function(id){
		var result = confirm("want to delete?");
		if(result){
			$http.delete('/api/todos/' + id)
				.success(function(data){
					$scope.todos = data;
					console.log(data);
				})
				.error(function(data){
					console.log('Error: '+ data);
				});
			};
	};

	$scope.updateTodo = function(id){
		$http.put('/api/todos/'+id)
			.success(function(data){
				$scope.todo = data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error: '+ data);
			});
	};

	$scope.createOrUpdate = function(){

	};

	$scope.edit = function(todo){
		$scope.formData = {
			_id: todo._id,
			text: todo.text,
			assigned_by: todo.assigned_by,
			priority: todo.priority
		};

		$scope.addButon = "Update";

		console.log($scope.formData);
	};
});