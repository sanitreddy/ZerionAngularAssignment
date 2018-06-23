var app = angular.module('demo', [])
var value = "eb151ded8e55ff8f52d339a2d01e95ab35d9ae88-9f1f985eb97b7adcc6ea339d70d3c98cfefbe2ff";
var docID;
app.controller('Hello', function($scope, $window, $http, $timeout){
	$scope.register=function(){
		$http({
    	url: 'https://alpha-dataflownode.zerionsoftware.com/code_assignment/register',
        method: 'POST',
        data: $scope.user
    })
		.then(function mySuccess(response){
			$scope.isDisplay = true;
			$scope.successMessage = "Successfully registered";
		}, function myError(response){
			$scope.isDisplay = false;
			$scope.errorMessage = "User already exists";
			$timeout(function(){
          $scope.errorMessage1 = true;
      },3000)
		});
	};

	$scope.getDoc=function(viewType){
    $scope.viewType = viewType;
	$http({ 
		url: 'https://alpha-dataflownode.zerionsoftware.com/code_assignment/records',
		method: 'GET',
		headers: {
    		'Authorization': 'Bearer ' +value
		}
	})
		.then(function mySuccess(response){
			$scope.doc = response.data;
      if (viewType == "table") {
        $scope.view = true;
      }
      else{
        $scope.view = false;
      }
			console.log("Success");
		}, function myError(response){
			console.log("Failed");
		});
	};

$scope.createDoc = function(name, description, imgs){
   var out = {
    name: name,
    description: description,
    imgs:[{
      url: imgs
    }]
   };
   $http({
    url:'https://alpha-dataflownode.zerionsoftware.com/code_assignment/records',
    method: 'POST',
    headers: 
         { 
           'Authorization': 'Bearer ' +value,
           'Content-type': 'application/json' 
         },
    data: JSON.stringify(out)
     })
   .then(function mySuccess(response){
    $scope.successMessage = "Successfully created";
   }, function myError(response){
    console.log("Failed");
   });
};

$scope.getDocId = function(docID){
  $http({ 
    url: 'https://alpha-dataflownode.zerionsoftware.com/code_assignment/records/'+docID,
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ' +value
    }
  })
    .then(function mySuccess(response){ 
      $window.localStorage.setItem('response', JSON.stringify(response.data));
      setTimeout(function(){
          $window.location.href='detailpage.html';
      },300)
    }, function myError(response){
      console.log("Failed");
    });
  };

$scope.init = function(){
      $scope.document = JSON.parse($window.localStorage.getItem('response'));
    }

$scope.updateDoc = function(docID, name, description, imgs){
  var res = {
    name: name,
    description: description,
    imgs:[{
      url: imgs
    }]
   };
 $http({
 url:'https://alpha-dataflownode.zerionsoftware.com/code_assignment/records/'+docID,
     method: 'PUT',
     headers: 
         { 
           'Authorization': 'Bearer ' +value,
           'Content-type': 'application/json'
         },
     data: JSON.stringify(res)
     })
  .then(function mySuccess(response){
      $scope.successMessage = "Successfully Updated";
  }, function myError(response){
    console.log("Failed");
  });
};

$scope.deleteDoc=function(docID){
		$http({
    	url: 'https://alpha-dataflownode.zerionsoftware.com/code_assignment/records/' +docID,
        method: 'DELETE',
        headers: {
        'Authorization': 'Bearer ' +value
    }
    	})
    	.then(function mySuccess(response){
			   console.log("Success");
    	}, function myError(response){
    		console.log("Failed")
    	});
  	};
});