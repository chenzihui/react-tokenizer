'use strict';

import React from 'react';
import TokenCell from './TokenCell';

const KEYS = {
  BACKSPACE: 8,
  TAB: 9,
  COMMA: 188,
  ENTER: 13
};

const SEPERATORS = [KEYS.TAB, KEYS.COMMA, KEYS.ENTER];

function _setCaretAtEnd(node) {
  let range, selection;

  range = document.createRange();
  range.selectNodeContents(node);
  range.collapse(false);

  selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
}

export default React.createClass({

  propTypes: {
    tokens: React.PropTypes.array,

    tokenize: React.PropTypes.func,
    removeToken: React.PropTypes.func
  },

  getDefaultProps() {
    return { tokens: [] };
  },

  componentDidMount() {
    this.refs.tokenInput.getDOMNode().focus();
  },

  // componentDidUpdate() {
  //   let node     = this.getDOMNode(),
  //       children = node.childNodes,
  //       lastNode = children[children.length - 1];

  //   if (this.props.tokens.length > 0) {
  //     if (lastNode.nodeType !== 3 || lastNode.textContent.trim()) {
  //       node.innerHTML += '&nbsp;';
  //     }
  //     _setCaretAtEnd(node);
  //   } else {
  //     node.innerHTML = '';
  //   }
  // },

  render() {
    let tokens = this.props.tokens.map(function(token, index) {
      return <TokenCell key={index} textContent={token} />;
    });

    return (
      <div className="rt-tokenizer">
        {tokens}

        <textarea
          className="rt-tokenizer__user-input"
          ref="tokenInput"
          onKeyDown={this._handleKeyDown}></textarea>
      </div>
    );
  },

  _handleKeyDown(evt) {
    let userInput = this.refs.tokenInput.getDOMNode(),
        token     = userInput.value;

    if (SEPERATORS.indexOf(evt.which) !== -1) {
      evt.preventDefault();

      if (token.trim()) {
        this.props.tokenize(token);
        userInput.value = '';
      }
    }
  },

  // _handleKeyDown(evt) {
  //   let node     = this.getDOMNode(),
  //       children = node.childNodes,

  //       lastNode, textContent;

  //   if (SEPERATORS.indexOf(evt.which) !== -1) {
  //     evt.preventDefault();

  //     if (children.length > 0) {
  //       lastNode    = children[children.length - 1];
  //       textContent = lastNode.textContent.trim();

  //       if (lastNode.nodeType === 3 && textContent) {
  //         node.removeChild(lastNode);
  //         this.props.tokenize(textContent);
  //       }
  //     }
  //   } else if (evt.which === KEYS.BACKSPACE) {
  //     let anchorNode, prevSibling;

  //     if (children.length > 0) {
  //       lastNode = children[children.length - 1];

  //       if (!lastNode.textContent.trim()) {
  //         evt.preventDefault();

  //         anchorNode = window.getSelection().anchorNode;
  //         prevSibling = anchorNode.previousSibling;

  //         this.props.removeToken(prevSibling.textContent.trim());
  //       }
  //     }
  //   }
  // },

  _handlePaste(evt) {
    evt.preventDefault();

    let clipboard = evt.clipboardData,
        data      = clipboard.getData('text/plain'),
        tokens    = data.split("\n");

    this.props.tokenize(tokens);
  }

});
