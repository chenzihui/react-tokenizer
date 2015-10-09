'use strict';

import React from 'react';

import Tokenizer from '../../src/Tokenizer';
import TokenCell from '../../src/TokenCell';

import SimpleExample from './SimpleExample';
import CustomTokenCellRendererExample from './CustomTokenCellRendererExample';

let App = React.createClass({

  getInitialState() {
    return { tokens: [] }
  },

  render() {
    return (
      <section className="app">
        <h1>react-tokenizer</h1>
        <p>Try the following: </p>
        <ul>
          <li>Enter in text, followed by the 'enter', 'tab', or 'comma' keys</li>
          <li>Delete tokens using the 'backspace' key</li>
          <li>Paste a list of items delimited by line breaks</li>
          <li>Input the string "magic-input"</li>
        </ul>

        <SimpleExample />
        <CustomTokenCellRendererExample />

      </section>
    );
  }
});

React.render(<App />, document.body);
