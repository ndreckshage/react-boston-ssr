'use strict';

var express = require('express');
var app = express();

// require 'component/x' vs. './../component/x'
const IS_DEV = process.env.NODE_ENV !== 'production';
process.env.NODE_PATH = IS_DEV ? `${__dirname}/src` : `${__dirname}/build`;
require('module').Module._initPaths();

var React /* js boston! */ = require('lib/react');

// WEBPACK
// -------
// DEV
// - transparent jsx
// - serve from /src
// - serve assets from webpack
// - react hot loader
// PROD
// - precompile jsx (jsx --extension jsx src/ build/)
// - serve from /build
// - serve assets from cdn
if (IS_DEV) {
  require('node-jsx').install({ extension: '.jsx' });
  var webpack = require('webpack');
  var webpackServer = require('webpack-dev-server');
  var webpackConfig = require('./webpack.config');
  new webpackServer(webpack(webpackConfig), {
    stats: { colors: true },
    publicPath: 'http://localhost:3001/build/',
    hot: true
  }).listen(3001, 'localhost', function() {
    console.log('webpack server at http://localhost:3001');
  });

  var request = require('request');
  app.use('/build/*', function(req, res) {
    req.pipe(request('http://localhost:3001'.concat(req.baseUrl, req.url))).pipe(res);
  });
}

// API
// ---
// node as a ui layer
// pipe requests right on through to endpoint
// app.use('/api/*', function(req, res) {
//   req.pipe(request('http://localhost:2999'.concat(req.baseUrl, req.url))).pipe(res);
// });

/**
 * layout
 * @param {string} js
 * @param {string} server rendered
 * @param {object} initialialize
 */
function render(uri, content, data) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <script>window.APPLICATION = { INITIALIZED: false };</script>
        <script src="${uri}" async></script>
      </head>
      <body>
        <div id="react">${content}</div>
        <script>
          window.APPLICATION.DATA = ${JSON.stringify(data)};
          try { window.APPLICATION.INIT(); } catch(e) {}
        </script>
      </body>
    </html>
  `;
}

// resolve route data then render w/ react router
var Router = require('react-router');
var Routes = require('lib/routes');
var resolveRoute = require('lib/resolve-route');
app.use(function(req, res) {
  var router = Router.create({ routes: Routes, location: req.url });
  router.run(function(Handler, state) {
    resolveRoute(req.context, state).then(function(data) {
      // prod cdn...
      res.send(render(
        'http://localhost:3001/build/client.js',
        React.renderToString(React.createElement(Handler, { data: data })),
        data
      ));
    });
  });
});

app.listen(3000, function() {
  console.log('express server at http://localhost:3000');
});
