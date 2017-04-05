var mongoose = require('mongoose');

var FavouritesSchema = mongoose.Schema({
  uid: String,
  name: String,
  email: String
});

module.exports = mongoose.model('Favourites', FavouritesSchema);
