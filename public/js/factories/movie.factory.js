function MovieFactory($http) {
  return {
    search: (searchTerm) => {
      return $http({
        method: 'GET',
        url: `/api/movies/search/${searchTerm}`
      });
    }
  };
}
MovieFactory.$inject = ['$http'];

angular
  .module('myApp')
  .factory('MovieFactory', MovieFactory);
