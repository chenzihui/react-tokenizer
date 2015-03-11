jest.dontMock('../src/Tokenizer');
jest.dontMock('../src/TokenCell');

var React     = require('react/addons'),
    Tokenizer = require('../src/Tokenizer'),
    TokenCell = require('../src/TokenCell'),
    TestUtils = React.addons.TestUtils;

describe('Tokenizer', function() {
  it('should display a list of tokens', function() {
    var tokens = ['Hello', 'World', 'Foo', 'Bar'],
        tokenizer, elements;

    tokenizer = TestUtils.renderIntoDocument(
      <Tokenizer tokens={tokens} />
    );

    elements = TestUtils.scryRenderedComponentsWithType(
      tokenizer, TokenCell);

    expect(elements.length).toEqual(4);
  });

  it('should not display any tokens if no data is passed in', function() {
    var tokenizer = TestUtils.renderIntoDocument(<Tokenizer />),
        elements;

    elements = TestUtils.scryRenderedComponentsWithType(
      tokenizer, TokenCell);

    expect(elements.length).toEqual(0);
  });

  describe('Creating Tokens', function() {
    var token, tokenize, tokenizer, textarea;

    beforeEach(function() {
      token = '';

      tokenize = function(newValue) {
        token = newValue;
      };

      tokenizer = TestUtils.renderIntoDocument(
        <Tokenizer tokenize={tokenize} />);

      textarea = TestUtils.findRenderedDOMComponentWithClass(
        tokenizer, 'rt-tokenizer__user-input');
    });

    it('should tokenize user input after ENTER is pressed', function() {
      const ENTER_KEY = 13;

      TestUtils.Simulate.change(
        textarea.getDOMNode(), { target: { value: 'Hello' } });
      TestUtils.Simulate.keyDown(
        textarea.getDOMNode(), { which: ENTER_KEY });

      expect(token).toEqual('Hello');
    });

    it('should tokenize user input after TAB is pressed', function() {
      const TAB_KEY = 9;

      TestUtils.Simulate.change(
        textarea.getDOMNode(), { target: { value: 'Hello' } });
      TestUtils.Simulate.keyDown(
        textarea.getDOMNode(), { which: TAB_KEY });

      expect(token).toEqual('Hello');
    });

    it('should tokenize user input after COMMA is pressed', function() {
      const COMMA_KEY = 188;

      TestUtils.Simulate.change(
        textarea.getDOMNode(), { target: { value: 'Hello' } });
      TestUtils.Simulate.keyDown(
        textarea.getDOMNode(), { which: COMMA_KEY });

      expect(token).toEqual('Hello');
    });
  });

  describe('Deleting Tokens', function() {
    var tokens, tokenizer, handleDelete, textarea;

    beforeEach(function() {
      tokens = ['Hello', 'World'];

      handleDelete = function(value) {
        var index = tokens.indexOf(value);
        tokens.splice(index, 1);
      };

      tokenizer = TestUtils.renderIntoDocument(
        <Tokenizer tokens={tokens} removeToken={handleDelete} />);

      textarea = TestUtils.findRenderedDOMComponentWithClass(
        tokenizer, 'rt-tokenizer__user-input');
    });

    it('should remove the latest token by pressing BACKSPACE', function() {
      const BACKSPACE = 8;

      TestUtils.Simulate.keyDown(
        textarea.getDOMNode(), { which: BACKSPACE });

      expect(tokens.length).toEqual(1);
      expect(tokens[0]).toEqual('Hello');
    })
  })
});
