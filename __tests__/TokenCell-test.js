/** @jsx React.DOM */

'use strict';

jest.dontMock('../src/TokenCell');

var React     = require('react/addons'),
    TokenCell = require('../src/TokenCell'),
    TestUtils = React.addons.TestUtils;

describe('TokenCell', function() {
  it('should render an element with text in it', function() {
    var tokenCell, element;

    tokenCell = TestUtils.renderIntoDocument(
      <TokenCell textContent="Testing" />
    );

    element = TestUtils.findRenderedDOMComponentWithClass(
      tokenCell, 'rt-cell');

    expect(element.getDOMNode().textContent).toEqual('Testing');
  });

  it('should not render an element if no data is passed', function() {
    var tokenCell = TestUtils.renderIntoDocument(<TokenCell />);

    expect(function() {
      TestUtils.findRenderedDOMComponentWithClass(tokenCell, 'rt-cell');
    }).toThrow();
  });
});
