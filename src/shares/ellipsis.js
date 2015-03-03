//making a filter
//$filter('filter') (array, expression, comparator)
app.filter('ellipsis', function(){
  return function (textarea, num) {
    if(textarea.length > num ) {
      var newTextArea = textarea.slice(0, num) + '...';
      return newTextArea;
    } else {
      return textarea;
    }
};
});
