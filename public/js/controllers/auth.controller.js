function AuthController($state, AuthFactory) {
  var controller = this;

  controller.createUser = function(){
    controller.error = null;
    AuthFactory.$createUserWithEmailAndPassword(controller.email, controller.password).then(
      // (firebaseUser) => is shorthand for function(firebaseUser) - only works for anon functions
      (firebaseUser) => {
        console.log('firebaseUser', firebaseUser);
        resetCredentials();
        $state.go('appFront');
      },
      (error) => {
        controller.error = error;
        console.warn('Could not create user with email and password', error);
        resetCredentials();
      }
    );
  };

  controller.signIn = () => {
    controller.error = null;
    AuthFactory.$signInWithEmailAndPassword(controller.email, controller.password).then(
     () => {
       resetCredentials();
       $state.go('appFront');
       console.log('signed in user: ');
     },
     (error) => {
       controller.error = error;
       console.warn('Could not log in user with email and password', error);
       resetCredentials();
     }

   );
  };

  controller.signOut = () => {
    AuthFactory.$signOut();
    $state.go('home');
  };

  controller.signOutNewUser = () => {
    AuthFactory.$signOut();
    $state.go('signup');
  };





  function resetCredentials() {
    controller.email= null;
    controller.password = null;
  }

  function init(){
    controller.user = null;
    controller.error = null;
    controller.email = '';
    controller.password= '';
    AuthFactory.$onAuthStateChanged((user) => {
      console.log('auth state changed: user:');
      controller.user = user;
    });
  }
  init();
}

AuthController.$inject = ['$state', 'AuthFactory'];

angular
  .module('myApp')
  .controller('AuthController', AuthController);
