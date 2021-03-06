function MovieController($stateParams, MovieFactory ){
  var controller = this;



  //////////////////////////////////////////////////
  //  Logic for click event
  //////////////////////////////////////////////////
  controller.selectedIndex = false;

  controller.itemClicked = function ($index) {
    controller.selectedIndex = $index;

  };


  //////////////////////////////////////////////////
  //  Logic for similar movies click event
  //////////////////////////////////////////////////
  controller.similarIndex = false;

  controller.similarClicked = function ($index) {
    controller.similarIndex = $index;
    console.log($index);

  };

  //////////////////////////////////////////////////
  //  Logic for search movies click event
  //////////////////////////////////////////////////
  controller.searchIndex = false;

  controller.searchClicked = function ($index) {
    controller.searchIndex = $index;
    console.log($index);

  };


            ///////////////////////////
//////////// Show More/Less Of Results ////////////
// Allow the use of youtube video urls
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
//////////// get in getMainList ////////////
  ///////////////////////////
  controller.getMainList = function () {
    controller.results = [];
    MovieFactory.getMainList().then(
(success) => {
  controller.results = success.data;
  console.log('getMainList: controller.results:', success.data);
},
(error) => {
  console.warn('getMainList.search: no results', error);
}
);
  };
//^^^^^^^^ get in getMainList ^^^^^^^^^//



            ///////////////////////////
//////////// getSearch of all movies ////////////
            ///////////////////////////
  controller.getSearchDetails = function () {
    controller.results = [];

    MovieFactory.getAll(controller.searchTerm).then(
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


            ///////////////////////////
////////////     getOne movie        ////////////
              ///////////////////////////
  controller.getOneMovie = function(){
    var movieId = $stateParams.movieId;
    controller.results = [];
    MovieFactory.getOne(movieId).then(
    (success) => {
      controller.results = success.data;
      console.log('movie:', success, movieId);
    },
      (error) => {
        console.warn('Error getting Movie:', error, movieId);
      }
    );
  };

  function init() {
  }

  init();
}
MovieController.$inject = ['$stateParams', 'MovieFactory'];

angular
  .module('myApp')
  .controller('MovieController', MovieController);
