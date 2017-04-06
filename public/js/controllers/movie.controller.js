function MovieController(MovieFactory, $stateParams){
  var controller = this;

            ///////////////////////////
//////////// Show More/Less Of Results ////////////
           ///////////////////////////

  var firstLimit = 5;
  var limitStep = 3;
  controller.limit = firstLimit;
  controller.incrementLimit = function() {
    if(controller.limit > 0) {
      controller.limit += limitStep;
      console.log('controller.limit:',controller.limit);
    }
  };
  controller.decrementLimit = function() {

    if(controller.limit < 3){
      limitStep += 3;
    } else {
      controller.limit -= limitStep;
    }
    console.log('controller.limit:',controller.limit);
  };
  //^^^^^^^^ Show More/Less Of Results ^^^^^^^^^//


            ///////////////////////////
//////////// getSearch of all movies ////////////
            ///////////////////////////
  controller.getSearchDetails = function () {
    controller.results = [];
    MovieFactory.searchAll(controller.searchTerm).then(
        (success) => {
          controller.results = success.data.results;
          console.log('MovieFactory.search: controller.results:', controller.results);
        },
        (error) => {
          console.warn('MovieFactory.search: no results', error);
        }
      );
  };
//^^^^^^^^ getSearch of all movies ^^^^^^^^^//


//get single movie by title
  controller.getMovie = function(){
    var movieId = $stateParams.movieId;

    MovieFactory.getOne(movieId).then(
    function success(response){
      console.log('todo: ',response);
      controller.selectedMovie = response.data;
    },
    function error(error){
      console.warn('Error getting todos: ', error);
    }
  );
  };
  function init() {

  }

  init();
}
MovieController.$inject = ['MovieFactory'];

angular
  .module('myApp')
  .controller('MovieController', MovieController);
