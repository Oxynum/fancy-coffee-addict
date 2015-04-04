controllers.controller('SignInCtrl', ['$scope', '$http', 'localStorageService', '$location',
  function($scope, $http, localStorageService, $location){
  $scope.user = {};
  $scope.methods = {
    login: function(){
      $http.post("http://localhost:3000/users/sign_in.json", {user: $scope.user}).
        then(function(result){
        localStorageService.set('me', result.data.user);
        $location.path('/main')
      }, function(error){
        console.log(error);
      });
    }
  }
}])