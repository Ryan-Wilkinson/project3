angular
    .module('projectThree')
    .service('UserService', UserService);

UserService.$inject = ['$http'];

// all http requests to server
function UserService($http) {
    const self = this;

    self.newUser = {};
    self.createNewUser = createNewUser;
    self.checkUser = checkUser;
    self.loadAllFavorites = loadAllFavorites;
    self.removeFavorite = removeFavorite;
    self.deleteSessions = deleteSessions;
    self.updateUser = updateUser;
    self.loadCurrentUser = loadCurrentUser;
    self.deleteUser =deleteUser;

    function createNewUser (newUser) {
    	return $http.post('/api/user/', newUser);
    }

    function checkUser(currentUser) {
        return $http.post('/api/sessions/login', currentUser);
    }

    function loadAllFavorites(id) {
        return $http.get('/api/applications/user/'+id);
    }

    function removeFavorite(userId, favId) {
        return $http.delete('/api/applications/user/'+userId+'/fav/'+favId);
    }

    function deleteSessions() {
        return $http.delete('/api/sessions/');
    }

    function updateUser(user) {
        return $http.patch('/api/user/' + user._id, user);
    }

    function loadCurrentUser(id) {
        return $http.get('/api/user/edit/' + id);
    }

    function deleteUser(user) {
        return $http.delete('/api/user/' +user._id);
    }
}
