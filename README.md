React Tokenizer
====================

A React.js component that parses user input and displays them as individual
tokens.

Example use cases include:
- Entering a list of email addresses
- Tagging

Installation
--------------------
```sh
npm install react-tokenizer
```

This library is written with CommonJS modules. You'll need to be using
Browserify or Webpack to consume it like any other modules from npm.

To run the example
--------------------

Run `npm install` followed by `gulp webserver`. Open your browser and visit
`http://localhost:8080`.

Tests
--------------------

To run the tests `npm test`.

How does it work?
--------------------

```js
var App = React.createClass({
    getInitialState: function() {
        return { tokens: [] };
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

    _tokenize: function(data) {
        // Logic to tokenize user input
    },

    _removeToken: function(token) {
        // Logic to remove a token
    }
});
```

The `<Tokenizer />` component takes in 3 propTypes i.e. `tokens`, `tokenize`
and `removeToken`.

`tokens` is basically an array of strings which will be rendered as individual
cells with a [x] that removes itself upon clicking.

`tokenize` is the function that is called whenever one of the key seperators is
pressed while the input has focus.

For now, the seperators are Tab, Comma and Enter.

`removeToken` will be fired whenever the input has focus, but there is no value
in it. The text content of the very last token will be sent as arguments.

Custom Token Cell Rendering
--------------------

You can further customize the UI and behavior of a `TokenCell` by providing your own custom renderer function to `Tokenizer` via the `tokenCellRenderer` property.

```js
// in render function
<Tokenizer
  tokens={this.state.tokens}
  tokenize={this._tokenize}
  removeToken={this._removeToken}
  tokenCellRenderer={this._customTokenCellRenderer} />

// in your page
_customTokenCellRenderer(token, index) {
  return (
    <div className="custom-cell" key={index}>
      HELLO {token}!
    </div>
  );
}
```


Paste Events
--------------------

Right now, if user input is pasted in, the Tokenizer simply splits them by
newlines and sends an array of strings to `tokenize`.

TODO
--------------------

- Cross browser compatibility
- Custom seperator keys
