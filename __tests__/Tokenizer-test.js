/** @jsx React.DOM */

'use strict';

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
});
