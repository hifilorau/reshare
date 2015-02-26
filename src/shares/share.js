app.factory('Share', function () {
  return function (spec) {
    spec = spec || {};
    return {

        url: spec.url,
        description: spec.description,
        tags: spec.tags,
        upvotes: spec.upvotes,
        downvotes: spec.downvotes,
        userId: spec.userId,
        _id: spec._id

    };
  };
});
