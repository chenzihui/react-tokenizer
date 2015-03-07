'use strict';

var React     = require('react'),
    TokenCell = require('./TokenCell'),

    Tokenizer;

const KEYS = {
  BACKSPACE: 8,
  TAB: 9,
  COMMA: 188,
  ENTER: 13
};

const SEPERATORS = [KEYS.TAB, KEYS.COMMA, KEYS.ENTER];

function _setCaretAtEnd(node) {
  var range, selection;

  range = document.createRange();
  range.selectNodeContents(node);
  range.collapse(false);

  selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
}

Tokenizer = React.createClass({

  propTypes: {
    tokens: React.PropTypes.array,

    tokenize: React.PropTypes.func,
    removeToken: React.PropTypes.func
  },

  getDefaultProps: function() {
    return { tokens: [] };
  },

  componentDidMount: function() {
    this.getDOMNode().focus();
  },

  componentDidUpdate: function() {
    var node     = this.getDOMNode(),
        children = node.childNodes,
        lastNode = children[children.length - 1];

    if (this.props.tokens.length > 0) {
      if (lastNode.nodeType !== 3 || lastNode.textContent.trim()) {
        node.innerHTML += '&nbsp;';
      }
      _setCaretAtEnd(node);
    } else {
      node.innerHTML = '';
    }
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

        lastNode, textContent;

    if (SEPERATORS.indexOf(evt.which) !== -1) {
      evt.preventDefault();

      if (children.length > 0) {
        lastNode    = children[children.length - 1];
        textContent = lastNode.textContent.trim();

        if (lastNode.nodeType === 3 && textContent) {
          node.removeChild(lastNode);
          this.props.tokenize(textContent);
        }
      }
    } else if (evt.which === KEYS.BACKSPACE) {
      var anchorNode, prevSibling;

      if (children.length > 0) {
        lastNode = children[children.length - 1];

        if (!lastNode.textContent.trim()) {
          evt.preventDefault();

          anchorNode = window.getSelection().anchorNode;
          prevSibling = anchorNode.previousSibling;

          this.props.removeToken(prevSibling.textContent.trim());
        }
      }
    }
  }

});

module.exports = Tokenizer;
