'use strict';

var React = require('react'),

    TokenCell;

TokenCell = React.createClass({

  propTypes: {
    textContent: React.PropTypes.string
  },

  render: function() {
    var textContent = this.props.textContent;

    if (!textContent || !textContent.trim()) { return null; }

    return (
      <div className="rt-cell"
        contentEditable="false">{textContent.trim()}</div>
    );
  }

});

module.exports = TokenCell;
