'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TokenCell from './TokenCell';

const KEYS = {
  BACKSPACE: 8,
  TAB: 9,
  COMMA: 188,
  ENTER: 13
};

const SEPERATORS = [KEYS.TAB, KEYS.COMMA, KEYS.ENTER];

export default React.createClass({

  propTypes: {
    tokens: React.PropTypes.array,

    tokenize: React.PropTypes.func,
    removeToken: React.PropTypes.func
  },

  getDefaultProps() {
    return { tokens: [] };
  },

  getInitialState() {
    return { userInput: '' };
  },

  componentDidMount() {
    this.refs.tokenInput.focus();
  },

  componentDidUpdate() {
    this.refs.tokenInput.focus();
  },

  render() {
    let self   = this,
        tokens = self.props.tokens.map(function(token, index) {
      return <TokenCell key={index} textContent={token}
        removeToken={self.props.removeToken}/>;
    });

    return (
      <div className="rt-tokenizer">
        {tokens}

        <textarea
          className="rt-tokenizer__user-input"
          ref="tokenInput"
          value={this.state.userInput}
          onKeyDown={this._handleKeyDown}
          onPaste={this._handlePaste}
          onChange={this._handleChange}></textarea>
      </div>
    );
  },

  _handleChange(evt) {
    this.setState({ userInput: evt.target.value });
  },

  _handleKeyDown(evt) {
    let userInput = this.state.userInput;

    if (SEPERATORS.indexOf(evt.which) !== -1) {
      evt.preventDefault();

      if (userInput.trim()) {
        this.props.tokenize(userInput);
        this.setState({ userInput: '' });
      }
    } else if (evt.which === KEYS.BACKSPACE) {
      if (userInput.trim()) { return; }

      let parent = ReactDOM.findDOMNode(this),
          cells  = parent.querySelectorAll('.rt-cell'),
          lastChild, textContent;

      if (cells.length > 0) {
        lastChild = cells[cells.length - 1];
        textContent = lastChild.querySelector('.rt-cell__content').textContent;

        this.props.removeToken(textContent);
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
