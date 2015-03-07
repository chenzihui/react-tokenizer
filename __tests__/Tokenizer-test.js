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
});
