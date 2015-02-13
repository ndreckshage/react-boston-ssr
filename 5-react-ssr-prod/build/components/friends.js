'use strict';

var React = require('lib/react');
var Friend = require('components/friend');

var componentStyle = {
  border: '1px solid #2ECC40',
  padding: '5px',
  margin: '5px'
};

module.exports = React.createClass({displayName: 'exports',
  render: function() {
    return (
      React.createElement("div", {style: componentStyle}, 
        React.createElement("p", null, "Friends List:"), 
        React.createElement("ul", null, 
          this.props.friends.map(function(friend, i) {
            return React.createElement(Friend, React.__spread({},  friend, {key: i}));
          })
        )
      )
    );
  }
});
