'use strict';

var React     = require('react'),
    TokenCell = require('./TokenCell'),

    Tokenizer;

const KEYS = {
  TAB: 9,
  COMMA: 188,
  ENTER: 13
};

const SEPERATORS = [KEYS.TAB, KEYS.COMMA, KEYS.ENTER];

function _findTextNode(nodes) {
  var i;

  for (i = 0; i < nodes.length; i++) {
    if (nodes[i].nodeType === 3) {
      return nodes[i];
    }
  }

  return null;
}

Tokenizer = React.createClass({

  propTypes: {
    tokens: React.PropTypes.array,
    tokenize: React.PropTypes.func
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
        contentEditable="true"
        onKeyDown={this._handleKeyDown}>{items}</div>
    );
  },

  _handleKeyDown: function(evt) {
    var node     = this.getDOMNode(),
        children = node.childNodes,

        textNode, textContent;

    if (SEPERATORS.indexOf(evt.which) !== -1) {
      evt.preventDefault();

      if (children.length > 0) {
        textNode = _findTextNode(children);

        if (textNode && textNode.textContent.trim()) {
          node.removeChild(textNode);
          this.props.tokenize(textNode.textContent.trim());
        }
      }
    }
  }

});

module.exports = Tokenizer;
