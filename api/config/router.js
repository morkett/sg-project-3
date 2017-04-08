var express = require('express');
var router = express.Router();
var movieController = require('../controllers/movie.js');

 //mainList
router.route('/api/movies/getMainList')
  .get(movieController.getMainList);

//search
router.route('/api/movies/search/:searchTerm')
  .get(movieController.show);

//get one movie
router.route('/api/movies/:movieId')
  .get(movieController.getOne);

module.exports = router;
