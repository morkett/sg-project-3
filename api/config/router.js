var express = require('express');
var router = express.Router();
var movieController = require('../controllers/movie.js');

 // custom routes
router.route('/api/movies/search/:searchTerm')
  .get(movieController.show);

module.exports = router;
