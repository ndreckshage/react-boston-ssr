'use strict';

var React = require('lib/react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

module.exports = React.createClass({
  render: function() {
    return <RouteHandler data={this.props.data.nestedData} />;
  }
});
