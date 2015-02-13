'use strict';

var Hogan = require('hogan.js');
var express = require('express');
var app = express();

// require 'component/x' vs. './../component/x'
process.env.NODE_PATH = `${__dirname}/src`;
require('module').Module._initPaths();

var fs = require('fs');
require.extensions['.mustache'] = function(module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};

/**
 * layout
 * @param {string} server rendered
 * @param {object} initialialize
 */
function render(content, data) {
  return `
    <!DOCTYPE html>
    <html>
      <head></head>
      <body>
        <div id="react">${content}</div>
        <script>window.INITIAL_DATA = ${JSON.stringify(data)};</script>
      </body>
    </html>
  `;
}

// ~1mb json payload from http://www.json-generator.com/
var data = { data: require('lib/json-generator.json') };

var applicationTemplate = require('templates/application.mustache');
var partials = {
  user: require('templates/user.mustache'),
  friends: require('templates/friends.mustache'),
  friend: require('templates/friend.mustache'),
  tag: require('templates/tag.mustache')
};

// var template = Hogan.compile(applicationTemplate);
app.use(function(req, res) {
  var html = render(
    Hogan.compile(applicationTemplate).render(data, partials),
    data
  );
  res.send(html);
});

app.listen(3000, function() {
  console.log('express server at http://localhost:3000');
});
