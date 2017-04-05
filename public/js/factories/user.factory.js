function UserFactory(API_URL, $http) {
  return {
    getAll: function() {
      return $http({
        method: 'GET',
        url: `${API_URL}`
      });
    },

    getOne: function(userId) {
      return $http({
        method: 'GET',
        url: `${API_URL}/users/${userId}`
      });
    },

    editOne: function(editedUser) {
      return $http({
        method: 'PATCH',
        url: `${API_URL}/users/${editedUser._id}`,
        data: editedUser
      });
    },

    createOne: function(newUser) {
      return $http({
        method: 'POST',
        url: `${API_URL}/users`,
        data: newUser
      });
    },

    deleteOne: function(userId) {
      return $http({
        method: 'DELETE',
        url: `${API_URL}/users/${userId}`
      });
    }


  };
}

angular
.module('myApp')
.factory('UserFactory',UserFactory);
