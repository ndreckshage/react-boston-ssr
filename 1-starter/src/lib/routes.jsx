'use strict';

var React = require('lib/react');
var Router = require('react-router');

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
// var NotFoundRoute = Router.NotFoundRoute;

var ApplicationLayout = require('components/application-layout');
var Index = require('components/index');

module.exports = (
  <Route path={'/'} handler={ApplicationLayout}>
    <DefaultRoute name={'index'} handler={Index} />
  </Route>
);
