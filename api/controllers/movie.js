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
//////////// getOne movie, video, similar ////////////
              ///////////////////////////
function getOne(req,res) {
  var movieId = req.params.movieId;

  var url = `${tmdb.TMDB_BASE_URL}/movie/${movieId}?api_key=${tmdb.TMDB_API_KEY}`;
  var urlVids =`${tmdb.TMDB_BASE_URL}/movie/${movieId}/videos?api_key=${tmdb.TMDB_API_KEY}`;
  var urlSimilar = `${tmdb.TMDB_BASE_URL}/movie/${movieId}/recommendations?&api_key=${tmdb.TMDB_API_KEY}&language=en-US`;


  request(url, (error,response,body) => {
    var singleMovieResultsJson;
    var singleVideoResultsJson;
    var similarMoviesResultsJson;

    singleMovieResultsJson = JSON.parse(body);
    if (error) {
      console.warn('Could not get movie:', error);
      res.status(500).json({ message: 'Could not get one movie - please check server logs' });
      return;
    }
    request(urlVids, (error,response,body) => {
      singleVideoResultsJson = JSON.parse(body);
      if (error) {
        console.warn('Could not get video:', error);
        res.status(500).json({ message: 'Could not get one video - please check server logs' });
        return;
      }
      request(urlSimilar, (error,response,body) => {

        if (error) {
          console.warn('Could not get video:', error);
          res.status(500).json({ message: 'Could not get one similar - please check server logs' });
          return;
        }
        similarMoviesResultsJson = JSON.parse(body);
        console.log('VIDEO',singleVideoResultsJson);
        var responseJson = {
          singleVideoResultsJson,
          singleMovieResultsJson,
          similarMoviesResultsJson
        };
        res.json(responseJson);

        console.log('movies similar: ',similarMoviesResultsJson);
      });
    });

  });
}
    ///////////////////////////
//////////// getMainList ////////////
    ///////////////////////////
function getMainList(req,res) {

  var urlInTheatres = `${tmdb.TMDB_BASE_URL}/discover/movie?primary_release_date.gte=2017-04-11&primary_release_date.lte=2017-05-30?&api_key=${tmdb.TMDB_API_KEY}&sort_by=popularity.desc&language=en-US`;
  var urlPopular = `${tmdb.TMDB_BASE_URL}/discover/movie?sort_by=popularity.asc?&api_key=${tmdb.TMDB_API_KEY}&sort_by=popularity.desc&language=en-US`;
  var urlSciFi = `${tmdb.TMDB_BASE_URL}/discover/movie?with_genres=${tmdb.GENRE_SCIFI}&sort_by=vote_average.desc?&api_key=${tmdb.TMDB_API_KEY}&sort_by=popularity.desc&language=en-US`;
  var urlRomance = `${tmdb.TMDB_BASE_URL}/discover/movie?with_genres=${tmdb.GENRE_ROMANCE}&sort_by=vote_average.desc?&api_key=${tmdb.TMDB_API_KEY}&sort_by=popularity.desc&language=en-US`;
  var urlHorror = `${tmdb.TMDB_BASE_URL}/discover/movie?with_genres=${tmdb.GENRE_HORROR}&sort_by=vote_average.desc?&api_key=${tmdb.TMDB_API_KEY}&sort_by=popularity.desc&language=en-US`;
  var urlComedy = `${tmdb.TMDB_BASE_URL}/discover/movie?with_genres=${tmdb.GENRE_COMEDY}&sort_by=vote_average.desc?&api_key=${tmdb.TMDB_API_KEY}&sort_by=popularity.desc&language=en-US`;
  var urlAni = `${tmdb.TMDB_BASE_URL}/discover/movie?with_genres=${tmdb.GENRE_ANI}&sort_by=vote_average.desc?&api_key=${tmdb.TMDB_API_KEY}&sort_by=popularity.desc&language=en-US`;
  var urlAction = `${tmdb.TMDB_BASE_URL}/discover/movie?with_genres=${tmdb.GENRE_ACTION}&sort_by=vote_average.desc?&api_key=${tmdb.TMDB_API_KEY}&sort_by=popularity.desc&language=en-US`;

  request(urlInTheatres, (error,response,body) => {
    var inTheatresResultsJson;
    var popularResultsJson;
    var sciFiResultsJson;
    var romanceResultsJson;
    var horrorResultsJson;
    var comedyResultsJson;
    var animationResultsJson;
    var actionResultsJson;

    inTheatresResultsJson = JSON.parse(body);
    if (error) {
      console.warn('Could not get movie:', error);
      res.status(500).json({ message: 'Could not get inTheatresResultsJson - please check server logs' });
      return;
    }
    request(urlPopular, (error,response,body) => {
      popularResultsJson = JSON.parse(body);
      if (error) {
        console.warn('Could not get video:', error);
        res.status(500).json({ message: 'Could not get popularResultsJson - please check server logs' });
        return;
      }


      request(urlSciFi, (error,response,body) => {
        sciFiResultsJson = JSON.parse(body);
        if (error) {
          console.warn('Could not get video:', error);
          res.status(500).json({ message: 'Could not get sciFiResultsJson - please check server logs' });
          return;
        }
        request(urlRomance, (error,response,body) => {
          romanceResultsJson = JSON.parse(body);
          if (error) {
            console.warn('Could not get video:', error);
            res.status(500).json({ message: 'Could not get romanceResultsJson - please check server logs' });
            return;
          }

          request(urlHorror, (error,response,body) => {
            horrorResultsJson = JSON.parse(body);
            if (error) {
              console.warn('Could not get video:', error);
              res.status(500).json({ message: 'Could not get horrorResultsJson - please check server logs' });
              return;
            }

            request(urlComedy, (error,response,body) => {
              comedyResultsJson = JSON.parse(body);
              if (error) {
                console.warn('Could not get video:', error);
                res.status(500).json({ message: 'Could not get comedyResultsJson - please check server logs' });
                return;
              }

              request(urlAni, (error,response,body) => {
                animationResultsJson = JSON.parse(body);
                if (error) {
                  console.warn('Could not get video:', error);
                  res.status(500).json({ message: 'Could not get animationResultsJson - please check server logs' });
                  return;
                }

                request(urlAction, (error,response,body) => {
                  actionResultsJson = JSON.parse(body);
                  if (error) {
                    console.warn('Could not get video:', error);
                    res.status(500).json({ message: 'Could not get actionResultsJson - please check server logs' });
                    return;
                  }

                  var responseJson = {
                    inTheatresResultsJson,
                    popularResultsJson,
                    // kidsResultsJson,
                    sciFiResultsJson,
                    romanceResultsJson,
                    horrorResultsJson,
                    comedyResultsJson,
                    animationResultsJson,
                    actionResultsJson
                  };
                  res.json(responseJson);
                });
              });
            });
          });
        });
      });
    });
  });
}


module.exports = {
  show: showMovieSearch,
  getMainList: getMainList,
  getOne: getOne
};
