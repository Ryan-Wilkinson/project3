const angular = require('angular');
require('angular-ui-router');

angular
    .module('projectThree', ['ui.router'])
    .config(uiRouterSetup)
    .run(connectGaToUiRouter)
    .run(initializeFullStory);

uiRouterSetup.$inject = ['$stateProvider', '$urlRouterProvider'];

function uiRouterSetup($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            template: ''
        })
        .state('about', {
            url: '/about',
            template: '<about></about>'
        })
        .state('signUp', {
            url: '/signup',
            template: '<sign-up></sign-up>'
        })
        .state('login', {
            url: '/login',
            template: '<login></login>'
        })
        .state('applications', {
            url:'/applications',
            template:'<applications></applications>'
        })
        .state('applicationShow', {
            url: '/applications/:companyId/app/:appId',
            template: '<application-show></application-show>'
        })
        .state('userAppShow', {
            url: '/applications/:companyId/app/:appId/:userId',
            template: '<application-show></application-show>'
        })
        .state('userApplications', {
            url:'/applications/:id',
            template:'<applications></applications>'
        })
        .state('user', {
            url:'/user/:id',
            template: '<user></user>'
        })
        .state('userEdit', {
            url: '/user/edit/:id',
            template: '<user-edit></user-edit>'
        });
    $urlRouterProvider.otherwise('/');
}

connectGaToUiRouter.$inject = ['$rootScope'];
function connectGaToUiRouter($rootScope){
    $rootScope.$on('$stateChangeSuccess', function pingBackGa(event, toState) {
        ga('send', 'pageview', toState.url);
    });
}
