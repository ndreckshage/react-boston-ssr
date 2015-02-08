'use strict';

var superagent = require('superagent');

const GET = 'get';
const POST = 'post';
const DEL = 'del';

[GET, POST, DEL].forEach(function(method) {
  /**
   * isomorphic requests
   * @param {string} pipe to api
   * @param {object} request specific
   */
  module.exports[method] = function(path, context) {
    var ajax;
    url = `http://localhost:2999/${path}`;
    switch (method) {
      case GET:
        ajax = superagent.get(url);
        break;
      case POST:
        ajax = superagent.post(url);
        break;
      case DEL:
        ajax = superagent.del(url);
        break;
    }

    // PASS COOKIES THROUGH FOR SESSION ETC
    // if (context && context.req) {
    //   var cookies = '';
    //   for (var cookie in context.req.cookies) {
    //     if (context.req.cookies.hasOwnProperty(cookie)) {
    //       cookies += (cookie + '=' + context.req.cookies[cookie] + ';');
    //     }
    //   }
    //   ajax.set('Cookie', cookies);
    // }

    return ajax;
  };
});
