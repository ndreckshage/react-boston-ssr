'use strict';

var React = require('lib/react');

var componentStyle = {
  border: '1px solid #0074D9',
  padding: '5px',
  margin: '5px',
  display: 'inline-block'
};

module.exports = React.createClass({displayName: 'exports',
  render: function() {
    return (
      React.createElement("div", {style: componentStyle}, this.props.tag)
    );
  }
});
