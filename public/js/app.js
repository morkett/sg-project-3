function MainRouter ($stateProvider, $urlRouterProvider, $locationProvider, AuthFactory) {

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/states/home.html'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: '/states/signup.html'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/states/login.html'
    })
    .state('auth-required', {
      url: '/authrequired',
      templateUrl: '/states/auth-required.html'
    })
    .state('app/search', {
      url: '/search/',
      templateUrl: '/states/search.html',
      //resolve - before you go to this state you must resolve whatever is in here
      resolve: {
        currentAuth: [
          'AuthFactory', (AuthFactory) => {
            return AuthFactory.$requireSignIn();
          }
        ]
      }
    })
    .state('movieDetails', {
      url: '/movie/:movieId',
      templateUrl: '/states/movieDetails.html',
      //resolve - before you go to this state you must resolve whatever is in here
      resolve: {
        currentAuth: [
          'AuthFactory', (AuthFactory) => {
            return AuthFactory.$requireSignIn();
          }
        ]
      }
    })
    .state('appFront', {
      url: '/getMainList',
      templateUrl: '/states/appFront.html',
      //resolve - before you go to this state you must resolve whatever is in here
      resolve: {
        currentAuth: [
          'AuthFactory', (AuthFactory) => {
            return AuthFactory.$requireSignIn();
          }
        ]
      }
    });

  $urlRouterProvider.otherwise('/');

}

MainRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

function AuthCatcher($rootScope, $state) {
  $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) =>{
    if (error === 'AUTH_REQUIRED') {
      $state.go('auth-required');
    }
  });
}

// AuthCatcher.$inject = ['$rootScope', '$state'];

angular
  .module('myApp', ['ui.router','firebase'])
  .constant('API_URL', 'http://localhost:3000')
  .config(MainRouter)
  .run(AuthCatcher);
