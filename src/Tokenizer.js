'use strict';

import React from 'react';
import AutosizeInput from 'react-input-autosize';

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
    removeToken: React.PropTypes.func,
    tokenCellRenderer: React.PropTypes.func
  },

  getDefaultProps() {
    return { tokens: [] };
  },

  getInitialState() {
    return { userInput: '' };
  },

  componentDidMount() {
    this._handleFocusInputField();
  },

  componentDidUpdate() {
    this._handleFocusInputField();
  },

  render() {
    let self = this;

    let tokens = self.props.tokens.map(function(token, index) {
      if (self.props.tokenCellRenderer) {
        return self.props.tokenCellRenderer(token, index);
      }
      else {
        return <TokenCell key={index} textContent={token} removeToken={self.props.removeToken}/>;
      }
    });

    return (
      <div className="rt-tokenizer" onClick={this._handleFocusInputField}>
        {tokens}
        <AutosizeInput
          type="text"
          ref="tokenInput"
          className="rt-tokenizer__user-input"
          value={this.state.userInput}
          onKeyDown={this._handleKeyDown}
          onPaste={this._handlePaste}
          onChange={this._handleChange}
        />
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

      let parent = this.getDOMNode(),
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
  },

  _handleFocusInputField() {
    React.findDOMNode(this.refs.tokenInput).getElementsByTagName('input')[0].focus();
  }

});
