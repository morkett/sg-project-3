/*global firebase */

function AuthRun() {
  var config = {
    apiKey: 'AIzaSyAOFMSr0GaBFuz2b1sY6kuzA6xY2O6dKqE',
    authDomain: 'angular-project-4019a.firebaseapp.com',
    databaseURL: 'https://angular-project-4019a.firebaseio.com',
    projectId: 'angular-project-4019a',
    storageBucket: 'angular-project-4019a.appspot.com',
    messagingSenderId: '313923295915'
  };

  firebase.initializeApp(config);
}

function AuthFactory($firebaseAuth){
  return $firebaseAuth();
}
AuthFactory.$inject = ['$firebaseAuth'];


angular
  .module('myApp')
  .run(AuthRun)
  .factory('AuthFactory', AuthFactory);
