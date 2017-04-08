var request = require('request');
var tmdb = require('../config/tmdb');

         ///////////////////////////
//////////// showMovieSearch ////////////
        ///////////////////////////

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

      ///////////////////////////
//////////// in Theatres ////////////
    ///////////////////////////
function showInTheatres(req, res) {
  var urlInTheatres = `${tmdb.TMDB_BASE_URL}/discover/movie?primary_release_date.gte=2017-04-11&primary_release_date.lte=2017-05-30?&api_key=${tmdb.TMDB_API_KEY}&sort_by=popularity.desc&language=en-US`;
  request(urlInTheatres, (error, response, body) => {
    var searchResultsJson;

    if (error) {
      console.warn('Could not find in theatres:', error);
      res.status(500).json({ message: 'Could not find in theatres - please check server logs' });
      return;
    }
        // JSON.parse convertsstring into JSON
    searchResultsJson = JSON.parse(body);
    console.log(urlInTheatres);
    res.json(searchResultsJson);
  });
}

    ///////////////////////////
//////////// getOne ////////////
    ///////////////////////////
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

  });
}
    ///////////////////////////
//////////// getMainList ////////////
    ///////////////////////////
function getMainList(req,res) {

  var urlInTheatres = `${tmdb.TMDB_BASE_URL}/discover/movie?primary_release_date.gte=2017-04-11&primary_release_date.lte=2017-05-30?&api_key=${tmdb.TMDB_API_KEY}&sort_by=popularity.desc&language=en-US`;
  var urlPopular = `${tmdb.TMDB_BASE_URL}/discover/movie?sort_by=popularity.asc?&api_key=${tmdb.TMDB_API_KEY}&sort_by=popularity.desc&language=en-US`;

  request(urlInTheatres, (error,response,body) => {
    var inTheatresResultsJson;
    var popularResultsJson;

    inTheatresResultsJson = JSON.parse(body);
    // if (error) {
    //   console.warn('Could not get movie:', error);
    //   res.status(500).json({ message: 'Could not get one movie - please check server logs' });
    //   return;
    // }
    request(urlPopular, (error,response,body) => {

      // if (error) {
      //   console.warn('Could not get video:', error);
      //   res.status(500).json({ message: 'Could not get one video - please check server logs' });
      //   return;
      // }
      popularResultsJson = JSON.parse(body);
      console.log('popular',popularResultsJson);
      var responseJson = {
        inTheatresResultsJson,
        popularResultsJson
      };
      res.json(responseJson);

      console.log('theatreResultsJson: ',responseJson.inTheatresResultsJson);
    });
    // JSON.parse convertsstring into JSON

  });
}



module.exports = {
  show: showMovieSearch,
  getMainList: getMainList,
  getOne: getOne
};
