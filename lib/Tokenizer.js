'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactInputAutosize = require('react-input-autosize');

var _reactInputAutosize2 = _interopRequireDefault(_reactInputAutosize);

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
    removeToken: _react2['default'].PropTypes.func,
    tokenCellRenderer: _react2['default'].PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return { tokens: [] };
  },

  getInitialState: function getInitialState() {
    return { userInput: '' };
  },

  componentDidMount: function componentDidMount() {
    this._handleFocusInputField();
  },

  componentDidUpdate: function componentDidUpdate() {
    this._handleFocusInputField();
  },

  render: function render() {
    var self = this;

    var tokens = self.props.tokens.map(function (token, index) {
      if (self.props.tokenCellRenderer) {
        return self.props.tokenCellRenderer(token, index);
      } else {
        return _react2['default'].createElement(_TokenCell2['default'], { key: index, textContent: token, removeToken: self.props.removeToken });
      }
    });

    return _react2['default'].createElement(
      'div',
      { className: 'rt-tokenizer', onClick: this._handleFocusInputField },
      tokens,
      _react2['default'].createElement(_reactInputAutosize2['default'], {
        type: 'text',
        ref: 'tokenInput',
        className: 'rt-tokenizer__user-input',
        value: this.state.userInput,
        onKeyDown: this._handleKeyDown,
        onPaste: this._handlePaste,
        onChange: this._handleChange
      })
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

      var _parent = this.getDOMNode(),
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
  },

  _handleFocusInputField: function _handleFocusInputField() {
    _react2['default'].findDOMNode(this.refs.tokenInput).getElementsByTagName('input')[0].focus();
  }

});
module.exports = exports['default'];