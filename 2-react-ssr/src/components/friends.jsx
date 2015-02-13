'use strict';

var React = require('react');
var Friend = require('components/friend');

var componentStyle = {
  border: '1px solid #2ECC40',
  padding: '5px',
  margin: '5px'
};

module.exports = React.createClass({
  render: function() {
    return (
      <div style={componentStyle}>
        <p>Friends List:</p>
        <ul>
          {this.props.friends.map(function(friend, i) {
            return <Friend {...friend} key={i} />;
          })}
        </ul>
      </div>
    );
  }
});
