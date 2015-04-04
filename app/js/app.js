var controllers = angular.module('coffeeAddictControllers', []);
var app = angular.module('coffeeAddict', [
  'ngRoute',
  'coffeeAddictControllers',
  'LocalStorageModule',
  'restangular'
]);

app.config(['$routeProvider', 'localStorageServiceProvider', 'RestangularProvider',
  function($routeProvider, localStorageServiceProvider, RestangularProvider) {
  $routeProvider.when('/sign_in', {
    templateUrl: 'partials/sign_in.html',
    controller: 'SignInCtrl'
  })
  .when("/main", {
    templateUrl: 'partials/main.html',
    controller: 'MainCtrl'
  })
  .when("/sign_up", {
    templateUrl: 'partials/sign_up.html',
    controller: 'SignUpCtrl'
  }).
  otherwise({
    redirectTo: '/sign_in'
  });

  localStorageServiceProvider.setPrefix('fancy-coffee');

  RestangularProvider.setRequestSuffix('.json')
  RestangularProvider.setBaseUrl('http://localhost:3000')
}]).
run(function(Restangular, localStorageService){
  user = localStorageService.get('me');
  if(user){
    Restangular.configuration.defaultHeaders = {
      'X-API-TOKEN': user.authentication_token,
      'X-API-EMAIL': user.email
    }
  }
});