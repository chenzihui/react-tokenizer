jest.dontMock('../src/TokenCell');

var React     = require('react'),
    ReactDOM  = require('react-dom'),
    TokenCell = require('../src/TokenCell'),
    TestUtils = require('react-addons-test-utils');

describe('TokenCell', function() {
  it('should render an element with text in it', function() {
    var tokenCell, element;

    tokenCell = TestUtils.renderIntoDocument(
      <TokenCell textContent="Testing" />
    );

    element = TestUtils.findRenderedDOMComponentWithClass(
      tokenCell, 'rt-cell__content');

    expect(ReactDOM.findDOMNode(element).textContent).toEqual('Testing');
  });

  it('should not render an element if no data is passed', function() {
    var tokenCell = TestUtils.renderIntoDocument(<TokenCell />);

    expect(function() {
      TestUtils.findRenderedDOMComponentWithClass(tokenCell, 'rt-cell');
    }).toThrow();
  });

  it('should remove itself when the x is clicked', function() {
    var removeToken, tokenCell, deleteBtn;

    removeToken = jest.genMockFunction();

    tokenCell   = TestUtils.renderIntoDocument(
          <TokenCell textContent="Hello" removeToken={removeToken} />);

    deleteBtn = TestUtils.findRenderedDOMComponentWithClass(
      tokenCell, 'rt-cell__delete');

    TestUtils.Simulate.click(deleteBtn);

    expect(removeToken).toBeCalledWith('Hello');
  })
});
