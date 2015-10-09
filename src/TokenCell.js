'use strict';

import React from 'react';

export default React.createClass({

  propTypes: {
    textContent: React.PropTypes.string
  },

  render() {
    let textContent = this.props.textContent;

    if (!textContent || !textContent.trim()) { return null; }

    return (
      <div className="rt-cell">
        <p className="rt-cell__content">{textContent.trim()}</p>
        <span className="rt-cell__delete"
          onClick={this._handleClick}>&times;</span>
      </div>
    );
  },

  _handleClick(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    let cell = this.getDOMNode(),
        textContent;

    textContent = cell.querySelector('.rt-cell__content').textContent;
    this.props.removeToken(textContent);
  }

});
