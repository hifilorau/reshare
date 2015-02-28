app.factory('commentService', ['$http', function($http) {
  function post(url, data) {
    return processAjaxPromise($http.post(url, data));
  }

  function get(url, data) {
    return processAjaxPromise($http.get(url, data));
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


    addComment: function (id) {
      alert("comments");
      return post('/api/res/' + id + '/comments', { text: 'text' });
    },

    listComments: function (id) {
      return get('/api/res/' + id + '/comments');
    }
  };
}]);
