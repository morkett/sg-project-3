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
  var urlVids =`${tmdb.TMDB_BASE_URL}/movie/${movieId}/videos?api_key=${tmdb.TMDB_API_KEY}`;

  request(url, (error,response,body) => {
    var singleMovieResultsJson;
    var singleVideoResultsJson;

    singleMovieResultsJson = JSON.parse(body);
    // if (error) {
    //   console.warn('Could not get movie:', error);
    //   res.status(500).json({ message: 'Could not get one movie - please check server logs' });
    //   return;
    // }
    request(urlVids, (error,response,body) => {

      // if (error) {
      //   console.warn('Could not get video:', error);
      //   res.status(500).json({ message: 'Could not get one video - please check server logs' });
      //   return;
      // }
      singleVideoResultsJson = JSON.parse(body);
      console.log('VIDEO',singleVideoResultsJson);
      var responseJson = {
        singleVideoResultsJson,
        singleMovieResultsJson
      };
      res.json(responseJson);
      console.log('movie: ',responseJson);
    });

    // JSON.parse convertsstring into JSON


  });
}


module.exports = {
  show: showMovieSearch,
  getOne: getOne
};
