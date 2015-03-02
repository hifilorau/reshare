app.factory('commentService', ['$http', '$log', function($http, $log) {
  function post(url, data) {
    return processAjaxPromise($http.post(url, data));
  }

  function get(url) {
    return processAjaxPromise($http.get(url));
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
    addComment: function (id, comment) {
      alert("comments");
      return post('/api/res/' + id + '/comments', { text: comment.text });
    },

    listComments: function (id) {
      return get('/api/res/' + id + '/comments');
    }
  };
}]);
