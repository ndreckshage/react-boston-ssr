'use strict';

var React = require('react');

var Tag = require('components/tag');
var Friends = require('components/friends');

var componentStyle = {
  border: '1px solid #eee',
  padding: '5px',
  margin: '5px',
  width: 300,
  display: 'inline-block'
};

module.exports = React.createClass({
  render: function() {
    return (
      <div className={'user-' + this.props._id} style={componentStyle}>
        <img src={this.props.picture} />
        <p>Name: {this.props.name}</p>
        <p>Age: {this.props.age}</p>
        <p>Phone: {this.props.phone}</p>
        <p>Net Worth: {this.props.balance}</p>
        {this.props.tags.map(function(tag, i) {
          return <Tag tag={tag} key={i} />;
        })}
        <Friends friends={this.props.friends} />
      </div>
    );
  }
});
