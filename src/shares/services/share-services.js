app.factory('shareService', ['$http', '$log', function($http, $log) {
  
  function get(url) {
    return processAjaxPromise($http.get(url));
  }

  function post(url, share) {
    return processAjaxPromise($http.post(url, share));
  }

  function remove(url) {
    return processAjaxPromise($http.delete(url));

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
    getShareList: function () {
      return get('/api/res');
    },

    getShare: function (id) {
      return get('/api/res/' + id);
    },

    addShare: function (share) {
      return post('/api/res', share);
    },

    deleteShare: function (id) {
      return remove('/api/res/' + id);
    }
  };
}]);
