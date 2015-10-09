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

        <h2>Basic usage</h2>

        <Tokenizer
          tokens={this.state.tokens}
          tokenize={this._tokenize}
          removeToken={this._removeToken} />

        <TokenList tokens={this.state.tokens} />

      </section>
    );
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
