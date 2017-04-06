//factory makes the reguest to server side

function MovieFactory($http) {
  return {
    searchAll: (searchTerm) => {
      var searchString = searchTerm.split(' ').join('+');
      return $http({
        method: 'GET',
        url: `/api/movies/search/${searchString}`
      });
    }
  };
}
MovieFactory.$inject = ['$http'];

angular
  .module('myApp')
  .factory('MovieFactory', MovieFactory);
