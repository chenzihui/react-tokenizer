'use strict';

var React     = require('react'),
    TokenCell = require('./TokenCell'),

    Tokenizer;

Tokenizer = React.createClass({

  propTypes: {
    tokens: React.PropTypes.array
  },

  getDefaultProps: function() {
    return { tokens: [] };
  },

  componentDidMount: function() {
    this.getDOMNode().focus();
  },

  render: function() {
    var items = this.props.tokens.map(function(token, index) {
      return <TokenCell key={index} textContent={token} />;
    });

    return (
      <div className="rt-tokenizer"
        contentEditable="true">{items}</div>
    );
  }

});

module.exports = Tokenizer;
