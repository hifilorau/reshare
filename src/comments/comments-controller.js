app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/shares/:id/comments', {
    controller: 'commentsCtrl',
    controllerAs: 'vm',
    templateUrl: 'comments/comments.html',
    resolve: {
      shares: ['commentService', function (commentService) {
        return commentService.listComments();
      }]
    }
  });
}])
.controller('commentsCtrl', ['$location' , 'Comment', 'commentService', 'shareService', 'Share', function ($location ,Comment, commentService, shareService, Share) {
   var self = this;

  self.comment = Comment();
  // self.share = shareService.getShare();

  self.goToShares = function () {
    $location.path('/shares');
  };

  self.addComment = function (share) {
    commentService.addComment(self.comment);
  };

  self.listComments = function () {
    commentService.listComments(id);
  };



}]);
