'use strict';

var React = require('lib/react');

var componentStyle = {
  padding: '5px',
  margin: '5px'
};

module.exports = React.createClass({
  render: function() {
    return (
      <li style={componentStyle}>{this.props.name} (ID: {this.props.id})</li>
    );
  }
});
