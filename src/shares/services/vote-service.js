app.factory('voteService', ['$http', function($http) {
  // My $http promise then and catch always
  // does the same thing, so I'll put the
  // processing of it here. What you probably
  // want to do instead is create a convenience object
  // that makes $http calls for you in a standard
  // way, handling post, put, delete, etc


  function post(share) {
    return processAjaxPromise($http.post(share));
  }


  function processAjaxPromise(p) {
    return p.then(function (result) {
      return result.data;
    })
    .catch(function (error) {
      $log.log(error);
    });
  }

  return {
    upVote: function (share) {
      return post('/api/res/' +id/votes);
        return { vote: 1 }
    },

    downVote: function (id) {
      return post('/api/res/' +id/votes);
        return { vote: -1 }
    }
  };
}]);
