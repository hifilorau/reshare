app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/shares/:id/comments', {
    controller: 'commentsCtrl',
    controllerAs: 'vm',
    templateUrl: 'comments/comments.html'
    // resolve: {
    //   shares: ['commentService', function (commentService) {
    //     return commentService.listComments();
    //   }]
    // }
  });
}])
.controller('commentsCtrl', ['$location' , 'Comment', 'commentService', function ($location ,Comment, commentService) {
   var self = this;


  self.goToShares = function () {
    $location.path('/shares');
  };

//
// self.comments = comments;
//   //
//   // self.AddComment = function (spec) {
//   //   comment: spec.comment
//   // };
//
//
//
//

}]);
