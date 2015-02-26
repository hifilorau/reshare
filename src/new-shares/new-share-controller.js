app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/bikes/new', {
    controller: 'NewBikeCtrl',
    controllerAs: 'vm',
    templateUrl: 'bikes/new-bike.html'
  });
}]).controller('NewBikeCtrl', ['$location', 'Bike', 'bikeStore', function($location, Bike, bikeStore) {
  var self = this;

  self.bike = Bike();

  self.doneEditing = function () {
    bikeStore.add(self.bike);
    self.goToBikes();
  };

  self.cancelEditing = function () {
    self.goToBikes();
  };

  self.goToBikes = function () {
    $location.path('/bikes');
  };

}]);
