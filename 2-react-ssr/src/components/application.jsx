'use strict';

var React = require('react');
var User = require('components/user');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.data.map(function(user) {
          return <User {...user} key={user._id} />;
        })}
      </div>
    );
  }
});
