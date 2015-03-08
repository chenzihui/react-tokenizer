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
          onKeyDown={this._handleKeyDown}
          onPaste={this._handlePaste}></textarea>
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
    } else if (evt.which === KEYS.BACKSPACE) {
      if (token.trim()) { return; }

      let parent = this.getDOMNode(),
          cells  = parent.querySelectorAll('.rt-cell'),
          lastChild;

      if (cells.length > 0) {
        lastChild = cells[cells.length - 1];
        this.props.removeToken(lastChild.textContent);
      }
    }
  },

  _handlePaste(evt) {
    evt.preventDefault();

    let clipboard = evt.clipboardData,
        data      = clipboard.getData('text/plain'),
        tokens    = data.split("\n");

    this.props.tokenize(tokens);
  }

});
