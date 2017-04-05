var express = require('express');
var router = express.Router();

var favouritesController = require('../controllers/favourites');

router.route('/favourites')
  .get(favouritesController.getAll)
  .post(favouritesController.createFavourites);

router.route('/favouritess/:id')
  .get(favouritesController.getFavourites)
  .patch(favouritesController.updateFavourites)
  .delete(favouritesController.deleteFavourites);


module.exports = router;
