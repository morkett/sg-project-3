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

module.exports = {
  show: showMovieSearch
};
