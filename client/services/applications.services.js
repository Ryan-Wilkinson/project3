angular
    .module('projectThree')
    .service('ApplicationsService', ApplicationsService);

ApplicationsService.$inject = ['$http'];

function ApplicationsService($http) {
    const self = this;

    self.loadAll = loadAll;
    self.loadCurrent =loadCurrent;
    self.userFav = userFav;
    self.currentUSerId = {};

    function loadAll() {
        return $http.get('/api/applications/');
    }

    function loadCurrent(companyId, appId) {
        return $http.get('/api/applications/'+companyId+'/app/'+appId);
    }

    function userFav(companyId, appId, userId) {
        self.currentUSerId = userId;
        return $http.post('/api/user/fav/'+userId+'/company/'+companyId+'/app/'+appId);
    }

    function getId() {
        return self.currentUSerId;
    }
}
