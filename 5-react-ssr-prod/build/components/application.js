'use strict';

var React = require('lib/react');
var User = require('components/user');

module.exports = React.createClass({displayName: 'exports',
  render: function() {
    return (
      React.createElement("div", null, 
        this.props.data.map(function(user) {
          return React.createElement(User, React.__spread({},  user, {key: user._id}));
        })
      )
    );
  }
});
