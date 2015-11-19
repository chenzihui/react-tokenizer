'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _TokenCell = require('./TokenCell');

var _TokenCell2 = _interopRequireDefault(_TokenCell);

var KEYS = {
  BACKSPACE: 8,
  TAB: 9,
  COMMA: 188,
  ENTER: 13
};

var SEPERATORS = [KEYS.TAB, KEYS.COMMA, KEYS.ENTER];

exports['default'] = _react2['default'].createClass({
  displayName: 'Tokenizer',

  propTypes: {
    tokens: _react2['default'].PropTypes.array,

    tokenize: _react2['default'].PropTypes.func,
    removeToken: _react2['default'].PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return { tokens: [] };
  },

  getInitialState: function getInitialState() {
    return { userInput: '' };
  },

  render: function render() {
    var self = this,
        tokens = self.props.tokens.map(function (token, index) {
      return _react2['default'].createElement(_TokenCell2['default'], { key: index, textContent: token,
        removeToken: self.props.removeToken });
    });

    return _react2['default'].createElement(
      'div',
      { className: 'rt-tokenizer' },
      tokens,
      _react2['default'].createElement('textarea', {
        className: 'rt-tokenizer__user-input',
        ref: 'tokenInput',
        value: this.state.userInput,
        onKeyDown: this._handleKeyDown,
        onPaste: this._handlePaste,
        onChange: this._handleChange })
    );
  },

  _handleChange: function _handleChange(evt) {
    this.setState({ userInput: evt.target.value });
  },

  _handleKeyDown: function _handleKeyDown(evt) {
    var userInput = this.state.userInput;

    if (SEPERATORS.indexOf(evt.which) !== -1) {
      evt.preventDefault();

      if (userInput.trim()) {
        this.props.tokenize(userInput);
        this.setState({ userInput: '' });
      }
    } else if (evt.which === KEYS.BACKSPACE) {
      if (userInput.trim()) {
        return;
      }

      var _parent = _reactDom2['default'].findDOMNode(this),
          cells = _parent.querySelectorAll('.rt-cell'),
          lastChild = undefined,
          textContent = undefined;

      if (cells.length > 0) {
        lastChild = cells[cells.length - 1];
        textContent = lastChild.querySelector('.rt-cell__content').textContent;

        this.props.removeToken(textContent);
      }
    }
  },

  _handlePaste: function _handlePaste(evt) {
    evt.preventDefault();

    var clipboard = evt.clipboardData,
        data = clipboard.getData('text/plain'),
        tokens = data.split("\n");

    this.props.tokenize(tokens);
  }

});
module.exports = exports['default'];