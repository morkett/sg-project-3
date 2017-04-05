var Favourites = require('../models/Favourites');

// GET
function getAll(request, response) {
  Favourites.find(function(error, favouritess) {
    if (error) return response.json(error);
    response.json(favouritess);
  }).select('-__v');
}

// POST
function createFavourites(request, response) {
  var favourites = new Favourites(request.body);
  favourites.save(function(error) {
    if (error) return response.json(error);
    response.json({favourites: favourites});
  });
}

// GET
function getFavourites(request, response) {
  var id = request.params.id;
  Favourites.findById({ _id: id }, function (error, favourites) {
    if (error) return response.json(error);
    response.json({favourites: favourites});
  }).select('-__v');
}

// DELETE
function deleteFavourites(request, response) {
  var id = request.params.id;
  Favourites.deleteOne({ _id: id }, function (error, favourites) {
    if (error) return response.json(error);
    response.json({favourites: favourites});
  });
}

//UPDATE

function updateFavourites(request, response) {
  var id = request.params.id;

  Favourites.findById({ _id: id }, function(error, favourites) {
    if(error) return response.json(favourites);

    if (request.body.uid !== undefined) favourites.title = request.body.uid;
    if (request.body.email !== undefined) favourites.desc = request.body.email;
    if (request.body.name !== undefined) favourites.type = request.body.name;


    favourites.save(function(error) {
      if (error) return response.status(404).json(error);

      response.json({ favourites: favourites });
    });
  }).select('-__v');
}

module.exports = {
  getAll: getAll,
  createFavourites: createFavourites,
  getFavourites: getFavourites,
  deleteFavourites: deleteFavourites,
  updateFavourites: updateFavourites
};
