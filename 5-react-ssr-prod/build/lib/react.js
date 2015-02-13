var React;
if (process.env.NODE_ENV !== 'production') {
  React = require('react');
} else {
  React = require('react/dist/react.min');
}
module.exports = React;