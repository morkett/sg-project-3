var request = require('request');
var tmdb = require('../config/tmdb');

function showMovieSearch(req, res) {
  var searchTerm = req.params.searchTerm;
  var url = `${tmdb.TMDB_BASE_URL}/search/movie?query=${searchTerm}&api_key=${tmdb.TMDB_API_KEY}`;

  request(url, (error, response, body) => {
    var searchResultsJson;

    if (error) {
      console.warn('Could not complete search:', error);
      res.status(500).json({ message: 'Could not complete search - please check server logs' });
      return;
    }
    // JSON.parse convertsstring into JSON
    searchResultsJson = JSON.parse(body);
    res.json(searchResultsJson);
  });
}
/////////////////////////////////////////////////////////////////////////////////
function getOne(req,res) {
  var movieId = req.params.movieId;

  var url = `${tmdb.TMDB_BASE_URL}/movie/${movieId}?api_key=${tmdb.TMDB_API_KEY}`;

  request(url, (error,response,body) => {
    var singleMovieResultsJson;

    if (error) {
      console.warn('Could not get movie:', error);
      res.status(500).json({ message: 'Could not get one movie - please check server logs' });
      return;
    }
    // JSON.parse convertsstring into JSON
    singleMovieResultsJson = JSON.parse(body);
    res.json(singleMovieResultsJson);
    console.log('movie: ',singleMovieResultsJson);
  });
}


module.exports = {
  show: showMovieSearch,
  getOne: getOne
};
