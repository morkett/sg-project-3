function UserController($state, $stateParams, UserFactory){
  var controller = this;

//RELOAD STATE
  controller.reloadState = function(){
    UserFactory.getAll().then(
      //success and error are no reserved words. they can be anything or not there
      function success(response) {
        controller.allUsers = response.data;
      },
      function error (error) {
        console.warn('Error getting users:', error);
      }
    );
  };

  //CHANGE STATE AND RELOADS DATA
  controller.changeState = function () {
    $state.transitionTo('home');
    controller.reloadState();
  };

  ////////////////////////
  // getOneUser
  ////////////////////////

  controller.getUser = function(){
    var userId = $stateParams.userId;

    UserFactory.getOne(userId).then(
      function success(response){
        console.log('user: ',response);
        controller.selectedUser = response.data;
      },
      function error(error){
        console.warn('Error getting users: ', error);
      }
    );
  };

  controller.editUser = function(userId) {
    $state.go('edit', {userId: userId});
  };

  controller.updateUser = function() {
    UserFactory.editOne(controller.selectedUser.user).then(
      function success(response){
        controller.changeState();
        console.log('user update: ', response);
      },
      function error (error) {
        console.warn('Error Updating: ',error);
      }
    );
  };

  controller.addUser = function(){
    UserFactory.createOne(controller.newUser).then(
      function success (response){
        controller.changeState();
        console.log('Created new User: ',response);
      },
      function error (error){
        console.warn('Error creating new User: ', error);
      }
    );
  };

  controller.deleteUser = function(userId){
    UserFactory.deleteOne(userId).then(
      function success(response){
        controller.changeState();
        console.log('Deleted User: ',response);
      },
      function error (error) {
        console.warn('Could not delete user: ',error);
      }
    );
  };

  controller.completeUser =function(userId) {
    console.log(`completeUser(${userId})`);
    UserFactory.completeOne(userId).then(
      function success(response){
        controller.changeState();
        console.log('Deleted User: ',response);
      },
      function error (error) {
        console.warn('Could not delete user: ',error);
      }
    );
  };



  function init() {
    console.log(controller);
    controller.allUsers = [];
    controller.selectedUser = undefined;
    controller.reloadState();
  }


  init();
}



angular
  .module('myApp')
  .controller('UserController', UserController);
