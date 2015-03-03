// The root module for our Angular application
var app = angular.module('app', ['ngRoute']);

app.factory('Comment', function () {
  return function (spec) {
    spec = spec || {};
    return {
      userId: spec.userId,
      text: spec.text,
      subjectId: 'the id of the object being commented on (usually a resource)',
      created: Date.now()
    };
  };
});

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

app.controller('MainNavCtrl',
  ['$location', 'StringUtil', function($location, StringUtil) {
    var self = this;

    self.isActive = function (path) {
      // The default route is a special case.
      if (path === '/') {
        return $location.path() === '/';
      }

      return StringUtil.startsWith($location.path(), path);
    };
  }]);

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
    shareService.addShare(self.share).then(self.goToShares);
  };

}]);

app.factory('Share', function () {
  return function (spec) {
    spec = spec || {};
    return {
        url: spec.url,
        description: spec.description,
        tags: spec.tags || 'general'
    };
  };
});

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

app.config(['$routeProvider', function($routeProvider) {
  var routeDefinition = {
    templateUrl: 'users/user.html',
    controller: 'UserCtrl',
    controllerAs: 'vm',
    resolve: {
      user: ['$route', 'usersService', function($route, usersService) {
        var routeParams = $route.current.params;
        return usersService.getByUserId(routeParams.userid);
      }]
    }
  };

  $routeProvider.when('/users/:userid', routeDefinition);
}])
.controller('UserCtrl', ['user', function (user) {
  this.user = user;
}]);

app.factory('User', function () {
  return function (spec) {
    spec = spec || {};
    return {
      userId: spec.userId || '',
      role: spec.role || 'user'
    };
  };
});

app.config(['$routeProvider', function($routeProvider) {
  var routeDefinition = {
    templateUrl: 'users/users.html',
    controller: 'UsersCtrl',
    controllerAs: 'vm',
    resolve: {
      users: ['usersService', function (usersService) {
        return usersService.list();
      }]
    }
  };

  $routeProvider.when('/users', routeDefinition);
}])
.controller('UsersCtrl', ['users', 'usersService', 'User', function (users, usersService, User) {
  var self = this;

  self.users = users;

  self.newUser = User();

  self.addUser = function () {
    // Make a copy of the 'newUser' object
    var user = User(self.newUser);

    // Add the user to our service
    usersService.addUser(user).then(function () {
      // If the add succeeded, remove the user from the users array
      self.users = self.users.filter(function (existingUser) {
        return existingUser.userId !== user.userId;
      });

      // Add the user to the users array
      self.users.push(user);
    });

    // Clear our newUser property
    self.newUser = User();
  };
}]);

// A little string utility... no biggie
app.factory('StringUtil', function() {
  return {
    startsWith: function (str, subStr) {
      str = str || '';
      return str.slice(0, subStr.length) === subStr;
    }
  };
});

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
      return post('/api/res/' + id + '/comments', { text: comment.text });
    },

    listComments: function (id) {
      return get('/api/res/' + id + '/comments');
    }
  };
}]);

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
    upvote: function (id) {

      return post('/api/res/' + id + '/votes', { vote: 1 });
    },

    downvote: function (id) {
      return post('/api/res/' + id + '/votes', { vote: -1 });
    }
  };
}]);

app.factory('usersService', ['$http', '$q', '$log', function($http, $q, $log) {
  // My $http promise then and catch always
  // does the same thing, so I'll put the
  // processing of it here. What you probably
  // want to do instead is create a convenience object
  // that makes $http calls for you in a standard
  // way, handling post, put, delete, etc
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
    list: function () {
      return get('/api/users');
    },

    getByUserId: function (userId) {
      if (!userId) {
        throw new Error('getByUserId requires a user id');
      }

      return get('/api/users/' + userId);
    },

    addUser: function (user) {
      return processAjaxPromise($http.post('/api/users', user));
    }
  };
}]);

//# sourceMappingURL=app.js.map