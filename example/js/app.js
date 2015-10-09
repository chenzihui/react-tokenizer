'use strict';

import React from 'react';
import Tokenizer from '../../src/Tokenizer';
import TokenCell from '../../src/TokenCell';

let App = React.createClass({

  getInitialState() {
    return { tokens: [] }
  },

  render() {
    return (
      <section className="app">
        <h1>react-tokenizer</h1>
        <Tokenizer
          tokens={this.state.tokens}
          tokenize={this._tokenize}
          removeToken={this._removeToken} />
        <p>Try the following: </p>
        <ul>
          <li>Enter in text, followed by the 'enter', 'tab', or 'comma' keys</li>
          <li>Delete tokens using the 'backspace' key</li>
          <li>Paste a list of items delimited by line breaks</li>
          <li>Input the string "magic-input"</li>
        </ul>

        <h2>Here are the tokens</h2>
        <ol>
          {
            this.state.tokens.map(function(token, index) {
              return <li key={index}>{token}</li>;
            })
          }
        </ol>
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

React.render(<App />, document.body);
