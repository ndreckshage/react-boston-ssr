'use strict';

module.exports = function(context, state) {
  var _data = [];
  return Promise.all(state.routes.filter(function(route) {
    _data.push({});
    route.depth = _data.length - 1;
    return route.handler.fetchData;
  }).map(function(route) {
    return route.handler.fetchData(context, state).then(function(d) {
      _data[route.depth] = d;
    });
  })).then(function() {
    var data = _data[0];
    var pointer = data;
    for (var i = 1, l = _data.length; i < l; i++) {
      pointer.nestedData = _data[i];
      pointer = pointer.nestedData;
    }
    return data;
  });
};
