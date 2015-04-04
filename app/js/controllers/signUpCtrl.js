controllers.controller('SignUpCtrl', ['$scope', '$http', '$location',
  function($scope, $http, $location){
  $scope.user = {};

  $scope.methods = {
    sign_up: function(){
      $http.post('http://localhost:3000/users', {user: $scope.user}).then(function(result){
        localStorageService.set('me', result.data.user);
        $location.path('#main.html')
      }, function(error){
        console.log(error);
      });
    }
  }
}]);