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
