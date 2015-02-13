'use strict';

var React = require('lib/react');

module.exports = React.createClass({
  statics: {
    fetchData: function() {
      return new Promise(function(resolve, reject) {
        resolve({ hi: 'Hi from React' });
      });
    }
  },

  _fireAlert: function() {
    alert(this.props.data.hi);
  },

  render: function() {
    return <p onClick={this._fireAlert}>Index: {this.props.data.hi}</p>;
  }
});
