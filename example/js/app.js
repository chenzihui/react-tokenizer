'use strict';

var React     = require('react'),
    Tokenizer = require('../../src/Tokenizer'),
    TokenCell = require('../../src/TokenCell'),

    App;

App = React.createClass({

  getInitialState: function() {
    return { tokens: [] }
  },

  render: function() {
    return (
      <section className="app">
        <Tokenizer
          tokens={this.state.tokens}
          tokenize={this._tokenize}
          removeToken={this._removeToken} />
      </section>
    );
  },

  _tokenize: function(token) {
    var tokens = this.state.tokens;

    tokens.push(token);
    this.setState({ tokens: tokens });
  },

  _removeToken: function(token) {
    var tokens = this.state.tokens,
        index  = tokens.indexOf(token);

    if (index !== -1) {
      tokens.splice(index, 1);
    }

    this.setState({ tokens: tokens });
  }

});

React.render(<App />, document.body);
