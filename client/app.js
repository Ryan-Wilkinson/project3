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

initializeFullStory.$inject = [];
function initializeFullStory() {
	window['_fs_debug'] = false;
	window['_fs_host'] = 'www.fullstory.com';
	window['_fs_org'] = '41BG9';
	window['_fs_namespace'] = 'FS';
	(function(m,n,e,t,l,o,g,y){
	    if (e in m && m.console && m.console.log) { m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].'); return;}
	    g=m[e]=function(a,b){g.q?g.q.push([a,b]):g._api(a,b);};g.q=[];
	    o=n.createElement(t);o.async=1;o.src='https://'+_fs_host+'/s/fs.js';
	    y=n.getElementsByTagName(t)[0];y.parentNode.insertBefore(o,y);
	    g.identify=function(i,v){g(l,{uid:i});if(v)g(l,v)};g.setUserVars=function(v){g(l,v)};
	    g.identifyAccount=function(i,v){o='account';v=v||{};v.acctId=i;g(o,v)};
	    g.clearUserCookie=function(c,d,i){if(!c || document.cookie.match('fs_uid=[`;`]*`[`;`]*`[`;`]*`')){
	    d=n.domain;while(1){n.cookie='fs_uid=;domain='+d+
	    ';path=/;expires='+new Date(0).toUTCString();i=d.indexOf('.');if(i<0)break;d=d.slice(i+1)}}};
	})(window,document,window['_fs_namespace'],'script','user');

	const randomKey = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);

	FS.identify(randomKey, {
	  displayName: randomKey
	});
}