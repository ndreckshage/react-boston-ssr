'use strict';

var React /* js boston! */ = require('react');
var express = require('express');
var app = express();

// require 'component/x' vs. './../component/x'
process.env.NODE_PATH = `${__dirname}/src`;
require('module').Module._initPaths();

require('node-jsx').install({ extension: '.jsx' });

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
var data = require('lib/json-generator.json');
var App = require('components/application');
app.use(function(req, res) {
  var html = render(
    React.renderToString(React.createElement(App, { data: data })),
    data
  );
  res.send(html);
});

app.listen(3000, function() {
  console.log('express server at http://localhost:3000');
});
