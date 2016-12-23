var webapp = angular.module('texasfossils', [
  'ngRoute', 'ngSanitize', 'ngResource', 'ngAnimate', 'ui.bootstrap',
  'ui.select', 'ui.keypress', 'nvd3', 'ngLodash', 'angularSpinner'
]);

// Take a string and trust as html
webapp.filter('htmlify', function ($sce) {
  return function (val) {
    return $sce.trustAsHtml(val);
  };
});

webapp.config(['$routeProvider', function (route) {
    // note: chain on additional route configs with .when(...)
    // The otherwise() (default) page loads from '/' and is the login page
    // All other pages should be restricted access besides the registration,
    // logout, and login pages.
    route.when('/', {
      templateUrl: './modules/home/home.html',
      controller: 'HomeController',
      access: {restricted: false}
    })
      .otherwise({
        redirectTo: '/login'
      });
  }
]);
