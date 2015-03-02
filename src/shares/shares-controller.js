app.config(['$routeProvider', function($routeProvider) {
  var routeDefinition = {
    templateUrl: 'shares/shares.html',
    controller: 'SharesCtrl',
    controllerAs: 'vm',
    resolve: {
      shares: ['shareService', function (shareService) {
        return shareService.getShareList();
      }]
    //   upvotes: ['voteService', function (voteService) {
    //     return VoteService.upvote();
    //   }],
    //   downvotes: ['voteService', function (voteService) {
    //     return VoteService.downvote();
    // }
  }
};
  $routeProvider.when('/', routeDefinition);
  $routeProvider.when('/shares', routeDefinition);
}])
.controller('SharesCtrl', ['$location', 'shares', 'shareService', 'Share', 'voteService', function ($location, shares, shareService, Share, voteService) {


var self = this;

  self.shares = shares;
  self.votes = function (upvote, downvote) {
    return votes = upvotes - downvotes;
  };

  self.upvote = function (share) {
    voteService.upvote(share);
  };

  self.downvote = function (share) {
    voteService.downvote(share);
  };

  self.goToComments = function(share) {
    $location.path('/shares/' + share._id + '/comments');
  };


}]);
