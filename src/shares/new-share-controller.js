app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/shares/new', {
    controller: 'NewShareCtrl',
    controllerAs: 'vm',
    templateUrl: 'shares/new-share.html'
  });
}]).controller('NewShareCtrl', ['$location', 'Share', 'shareService', function($location, Share, shareService) {
  var self = this;

  self.share = Share();

  // self.doneEditing = function () {
  //   bikeStore.add(self.bike);
  //   self.goToShares();
  // };

  self.cancelEditing = function () {
    self.goToShares();
  };

  self.goToShares = function () {
    $location.path('/shares');
  };

  self.addShare = function () {
    alert("I SHOULD BE ADDING STUFF");
    shareService.addShare(self.share).then(self.goToShares);
  };

}]);
