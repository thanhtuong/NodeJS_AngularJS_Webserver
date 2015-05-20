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
		_id: '',
		text: '',
		assigned_by: '',
		priority: ''
	}
	return formData;
});
todoApp.factory('changeButtonLabel',function(){
	var addButon = {
		text: 'Add'
	}
	return addButon;
});
todoApp.factory('isUpdateFlag',function(){
	var isEdit = {
		value: false
	}
	return isEdit;
});
todoApp.controller('mainController', function($scope, $http, storeDataService, changeButtonLabel,isUpdateFlag){
	$scope.formData = storeDataService.formData;
	$scope.addButon = changeButtonLabel.addButon;
	$scope.isEdit = isUpdateFlag.isEdit;

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
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error: '+ data);
			});
	};

	$scope.createOrUpdate = function(){
		if($scope.isEdit.value){
			$scope.updateTodo(storeDataService.formData._id);
		}else {
			$scope.createTodo();
		}
	};

	$scope.edit = function(todo){
		$scope.formData = {
			_id: todo._id,
			text: todo.text,
			assigned_by: todo.assigned_by,
			priority: todo.priority
		};
		$scope.addButon ={
			text: 'update'
		};
		$scope.isEdit = {
			value: true
		};
		isUpdateFlag.isEdit = $scope.isEdit;
		storeDataService.formData = $scope.formData;
		changeButtonLabel.addButon = $scope.addButon;
		console.log($scope.formData);
	};
});