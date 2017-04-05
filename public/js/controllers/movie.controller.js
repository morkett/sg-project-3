function MovieController($http, $state, $scope){
  var controller = this;

  $scope.$watch('search', function() {
    fetch();
  });

  controller.search = 'Thor';

  function fetch(){
    $http.get('http://www.omdbapi.com/?t=' + controller.search + '&tomatoes=true&plot=full')
        .then(function(response){
          controller.details = response.data;
        });

    $http.get('http://www.omdbapi.com/?s=' + controller.search)
        .then(function(response){
          controller.related = response.data;
        });
  }

  controller.update = function(movie){
    controller.search = movie.Title;
  };

  controller.select = function(){
    this.setSelectionRange(0, this.value.length);
    console.log('selected');
  };



  function init() {

  }


  init();
}



angular
  .module('myApp')
  .controller('MovieController', MovieController);
