/***
 * OPTIONAL: reference additional vendor packages imported into index.ejs below
 * ui.view could be added here but currently ng-view is being used.
 */

var texasfossils = angular.module('texasfossils', [
  'ngRoute', 'ngSanitize', 'ngResource', 'ngAnimate', 'ui.bootstrap',
  'ui.select', 'ui.keypress', 'nvd3', 'ngLodash', 'angularSpinner'
]);

// Custom filter to take string and trust as html
texasfossils.filter('htmlify', function ($sce) {
  return function (val) {
    return $sce.trustAsHtml(val);
  };
});

texasfossils.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    // note: chain on additional route configs with .when(...)
    // The otherwise() (default) page loads from '/' and is the login page
    // All other pages should be restricted access besides the registration,
    // logout, and login pages.
    $routeProvider.when('/', {
      templateUrl: '../templates/home.html',
      controller: 'HomeController',
      access: {restricted: false}
    }).when('/login', {
      templateUrl: '../templates/login.html',
      controller: 'LoginController',
      access: {restricted: false}
    }).when('/logout', {
      controller: 'LogoutController'
    }).when('/register', {
      templateUrl: '../templates/register.html',
      controller: 'RegisterController',
      access: {restricted: false}
    }).when('/treeTest', {
      templateUrl: '../templates/treeTest.html',
      controller: 'TreeController',
      access: {restricted: false}
    })
    .when('/home', {
      templateUrl: '../templates/home.html',
      controller: 'HomeController',
      access: {restricted: false}
    })
    .otherwise({
      redirectTo: '/home'
    });
    
    // use the HTML5 History API
    // $locationProvider.html5Mode(true);    
  }
]);