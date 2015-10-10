'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

exports['default'] = _react2['default'].createClass({
  displayName: 'TokenCell',

  propTypes: {
    textContent: _react2['default'].PropTypes.string
  },

  render: function render() {
    var textContent = this.props.textContent;

    if (!textContent || !textContent.trim()) {
      return null;
    }

    return _react2['default'].createElement(
      'div',
      { className: 'rt-cell' },
      _react2['default'].createElement(
        'p',
        { className: 'rt-cell__content' },
        textContent.trim()
      ),
      _react2['default'].createElement(
        'span',
        { className: 'rt-cell__delete',
          onClick: this._handleClick },
        'x'
      )
    );
  },

  _handleClick: function _handleClick(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    var cell = this.getDOMNode(),
        textContent = undefined;

    textContent = cell.querySelector('.rt-cell__content').textContent;
    this.props.removeToken(textContent);
  }

});
module.exports = exports['default'];