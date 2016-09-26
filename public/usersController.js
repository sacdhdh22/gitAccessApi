/**
 * Created by sachinPc on 9/26/2016.
 */

var app = angular.module('myApp', []);

app.controller('gitController', function($scope, $http,$window){
    $scope.error= " ";
    $scope.register=function(){
        console.log($scope.fullname);
     if(!$scope.fullname){
         $scope.error = "Please eneter a valid Url"
     }
     $http.post('/click/', {url : $scope.fullname}).then(function(issue){
         $scope.error =" ";
         var gitIssues = issue.data.total;
         if(!gitIssues) {
             $scope.error = "No Issues";
         }
         $scope.issues = issue.data.total;

         console.log(data);
     },function(response){
         $scope.error = "No Issues";
     });

    };
});