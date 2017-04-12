angular
    .module('projectThree')
    .service('ApplicationsService', ApplicationsService);
// inject $http
ApplicationsService.$inject = ['$http'];

function ApplicationsService($http) {
    const self = this;

    self.loadAll = loadAll;
    self.loadCurrent =loadCurrent;
    self.userFav = userFav;
    self.currentUSerId = {};
// load all applications
    function loadAll() {
        return $http.get('/api/applications/');
    }
// load selected application
    function loadCurrent(companyId, appId) {
        return $http.get('/api/applications/'+companyId+'/app/'+appId);
    }
// post selected item to user favorites
    function userFav(companyId, appId, userId) {
        self.currentUSerId = userId;
        return $http.post('/api/user/fav/'+userId+'/company/'+companyId+'/app/'+appId);
    }
// get ID of current user
    function getId() {
        return self.currentUSerId;
    }
}
