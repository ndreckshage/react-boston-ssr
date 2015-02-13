'use strict';

var express = require('express');

// require 'component/x' vs. './../component/x'
const IS_DEV = process.env.NODE_ENV !== 'production';
process.env.NODE_PATH = IS_DEV ? `${__dirname}/src` : `${__dirname}/build`;
require('module').Module._initPaths();

var React /* js boston! */ = require('lib/react');

// jsx --extension jsx src/ build/
if (IS_DEV) {
  require('node-jsx').install({ extension: '.jsx' });
}

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

var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;
if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
} else {
  var app = express();
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
}
