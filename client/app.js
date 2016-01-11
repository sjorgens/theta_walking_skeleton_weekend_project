/**
 * Created by Scott on 1/9/16.
 */
//  defining our angular app as 'app'
var app = angular.module('app', []);

//  hook up controller for how information will be displayed
//  controller is defined as 'IndexController'
//  include important modules to communicate back and forth with the server
app.controller("IndexController", ['$scope', '$http', function($scope, $http){
    //  define 1 cat
    $scope.cat = {};

    //  define a list of cats
    $scope.cats = [];

    //  go and get our cat info from server nad db and set equal to cats
    var fetchCats = function(){
      return $http.get('/cats').then(function(response){
          if(response.status !== 200){
              throw new Error('Failed to fetch cats from the API');
          }
          $scope.cat = {};
          $scope.cats = response.data;
          return response.data;
      })
    };

    //  post info to the server and then update server and db
    $scope.addCat = function(cat){
        //  after update server and db, chain another function with 'then'; fetchCats() will update list of info
        return $http.post('/add', cat).then(fetchCats());
    };
    //  fun right away on app load in case there are cats already in existing db
    fetchCats();
}]);