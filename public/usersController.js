/**
 * Created by sachinPc on 9/26/2016.
 */

var app = angular.module('myApp', ['angularSpinner']);

app.controller('gitController', function($scope, $http, usSpinnerService){
    $scope.error= " ";
    $scope.register=function(){
        usSpinnerService.spin('spinner-1'); // Just added a spinner while the data is being loaded
     if(!$scope.url){
         $scope.error = "Please eneter  a valid Url"
     }
     $http.post('/gitAccess/', {url : $scope.url}).then(function(issue){
         usSpinnerService.stop('spinner-1');
         $scope.error =" ";
         var gitIssues = issue.data.total;
         if(JSON.stringify(gitIssues)=="{}") {
             $scope.error = "No Issues Found Please Check the URL and try again...!";
         }
         $scope.issues = issue.data.total;
     },function(response){
         usSpinnerService.stop('spinner-1');
         $scope.error = "No Issues Found Please Check the URL and try again...!";
     });

    };
});