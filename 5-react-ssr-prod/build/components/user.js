'use strict';

var React = require('lib/react');

var Tag = require('components/tag');
var Friends = require('components/friends');

var componentStyle = {
  border: '1px solid #eee',
  padding: '5px',
  margin: '5px',
  width: 300,
  display: 'inline-block'
};

module.exports = React.createClass({displayName: 'exports',
  render: function() {
    return (
      React.createElement("div", {className: 'user-' + this.props._id, style: componentStyle}, 
        React.createElement("img", {src: this.props.picture}), 
        React.createElement("p", null, "Name: ", this.props.name), 
        React.createElement("p", null, "Age: ", this.props.age), 
        React.createElement("p", null, "Phone: ", this.props.phone), 
        React.createElement("p", null, "Net Worth: ", this.props.balance), 
        this.props.tags.map(function(tag, i) {
          return React.createElement(Tag, {tag: tag, key: i});
        }), 
        React.createElement(Friends, {friends: this.props.friends})
      )
    );
  }
});
