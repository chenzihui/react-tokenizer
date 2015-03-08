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
      <div className="rt-cell"
        contentEditable="false">{textContent.trim()}</div>
    );
  }

});
