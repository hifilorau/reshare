app.factory('voteService', ['$http', function($http) {
  function post(url, data) {
    return processAjaxPromise($http.post(url, data));
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
    upVote: function (id) {
      alert("HELFLFDFDSF");
      return post('/api/res/' + id + '/votes', { votes: 1 });
    },

    downVote: function (id) {
      return post('/api/res/' + id + '/votes', { votes: -1 });
    }
  };
}]);
