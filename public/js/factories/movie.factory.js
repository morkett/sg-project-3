function MovieFactory($http) {
  return {
    getAll: (searchTerm) => {
      var searchString = searchTerm.replace(' ', '+');
      return $http({
        method: 'GET',
        url: `/api/movies/search/${searchString}`
      });
    },
    getOne: (movieId) => {
      return $http({
        method: 'GET',
        url: `/api/movies/${movieId}`
      });
    },
    getMainList: () => {
      return $http({
        method: 'GET',
        url: `/api/movies/getMainList`
      });
    }
  };
}
MovieFactory.$inject = ['$http'];

angular
  .module('myApp')
  .factory('MovieFactory', MovieFactory);
