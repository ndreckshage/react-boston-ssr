'use strict';

var DomReady = require('domready');
var React = require('react');
var Router = require('react-router');
var Routes = require('lib/routes');
var resolveRoute = require('lib/resolve-route');

// server abstraction
var context = {};

/**
 * render react root
 * @param {object} active route
 * @param {object} resolved data
 */
 function render(Handler, data) {
   React.render(<Handler data={data} />, document.getElementById('react'));
 }

/**
 * client server takeover. expect window.APPLICATION to exist
 */
function init() {
  if (window.APPLICATION.DATA) {
    if (!window.APPLICATION.INITIALIZED) {
      Router.run(Routes, Router.HistoryLocation, function(Handler, state) {
        if (window.APPLICATION.INITIALIZED) {
          resolveRoute(context, state).then(function(data) {
            render(Handler, data);
          });
        } else {
          render(Handler, window.APPLICATION.DATA);
        }
      });
    }
    window.APPLICATION.INITIALIZED = true;
  }
}
window.APPLICATION.INIT = init;
DomReady(init);
