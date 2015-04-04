controllers.controller('MainCtrl', ['$scope', '$http', 'localStorageService', 'Restangular',
  function($scope ,$http, localStorageService, Restangular){

  var dispatcher = new WebSocketRails('localhost:3000/websocket');
  var connectToChannel = function(){
    $scope.channel = dispatcher.subscribe($scope.current_room.channel_name);
    $scope.channel.bind('new_second_user', function(data){
      console.log(data);
    })
    $scope.channel.bind('new_message', function(data){
      console.log(data);
    })
  };
  $scope.user = localStorageService.get('me');
  $scope.current_room = localStorageService.get('current_room');
  if($scope.current_room){
    Restangular.one('rooms', $scope.current_room.id).get().then(function(result){
      $scope.current_room = result.room;
      connectToChannel();
    })
  }

  $scope.message = "";
  $scope.methods = {
    createRoom: function(){
      Restangular.one('users', $scope.user.id).post('rooms', {
        latitude: 1,
        longitude: 1
      }).then(function(result){
        localStorageService.set('current_room', result.room);
        $scope.current_room = result.room;
        connectToChannel();
      });
    },
    sendMessage: function(){
      $scope.channel.trigger("new_message", $scope.message);
    }
  }

}]);