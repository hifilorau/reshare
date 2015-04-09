app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/shares/:id/comments', {
    controller: 'commentsCtrl',
    controllerAs: 'vm',
    templateUrl: 'comments/comments.html',
    resolve: {
      share: ['shareService', '$route', function (shareService, $route) {
        return shareService.getShare($route.current.params.id);
      }],
      comments: ['commentService', '$route', function (commentService, $route) {
        return commentService.listComments($route.current.params.id);
      }]
    }
  });
}])
.controller('commentsCtrl', ['$location', 'comments', 'Comment', 'commentService', 'shareService', 'share', function ($location, comments, Comment, commentService, shareService, share) {
   var self = this;

  self.comments = comments;
  self.share = share;
  self.comment = Comment();



  self.addComment = function () {
    commentService.addComment(self.share._id, self.comment).then(function(comment) {
      self.comments.push(comment);
      self.comment.text = '';
    });
  };

  self.listComments = function () {
    commentService.listComments(self.share._id);
  };

}]);
