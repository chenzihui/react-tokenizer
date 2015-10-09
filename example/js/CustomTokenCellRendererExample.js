'use strict';

import React from 'react';

import Tokenizer from '../../src/Tokenizer';
import TokenCell from '../../src/TokenCell';
import TokenList from './TokenList';

export default React.createClass({

  getInitialState() {
    return { tokens: [] }
  },

  render() {
    return (
      <section>

        <h2>Custom TokenCell renderer</h2>
        <p>You can supply your own <strong>tokenCellRenderer</strong> function to customize your token cells as you wish</p>

        <Tokenizer
          tokens={this.state.tokens}
          tokenize={this._tokenize}
          removeToken={this._removeToken}
          tokenCellRenderer={this._customTokenCellRenderer} />

        <TokenList tokens={this.state.tokens} />

      </section>
    );
  },

  _customTokenCellRenderer(token, index) {
    return (
      <div className="rt-cell custom-cell" key={index}>
        Hello: <p className="rt-cell__content">{token.trim()}</p>
        <span className="rt-cell__delete" onClick={this._handleCustomTokenCellClick}>&times;</span>
      </div>
    );
  },

  _handleCustomTokenCellClick(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    let cell = this.getDOMNode(),
        textContent;

    textContent = cell.querySelector('.rt-cell__content').textContent;
    this._removeToken(textContent);
  },

  _tokenize(data) {
    let tokens = this.state.tokens;

    // We can perform some sort of validation logic on the entered data
    // OR even transform the input
    if (data === 'magic-input') {
      console.log('You have done something magical!');
      tokens.push('Abracadabra!');
      this.setState({ tokens: tokens });
      return;
    }

    if (Array.isArray(data)) {
      tokens = tokens.concat(data)
    } else {
      tokens.push(data);
    }

    this.setState({ tokens: tokens });
  },

  _removeToken(token) {
    let tokens = this.state.tokens,
        index  = tokens.indexOf(token);

    if (index !== -1) {
      tokens.splice(index, 1);
    }

    this.setState({ tokens: tokens });
  }

});
