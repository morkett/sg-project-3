function MovieController(MovieFactory){
  var controller = this;

  function init() {
    controller.results = [];
    MovieFactory.search().then(
      (success) => {
        controller.results = success.data.results;
        console.log('MovieFactory.search: controller.results:', controller.results);
      },
      (error) => {
        // fill this in
      }
    );
  }

  init();
}
MovieController.$inject = ['MovieFactory'];

angular
  .module('myApp')
  .controller('MovieController', MovieController);
