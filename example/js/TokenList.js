'use strict';

import React from 'react';

export default React.createClass({

  render() {
    if (this.props.tokens < 1) {
      return null;
    }

    return (
      <div className="token-list">
        <h2>Here are the tokens</h2>
        <ol>
          {
            this.props.tokens.map(function(token, index) {
              return <li key={index}>{token}</li>;
            })
          }
        </ol>
      </div>
    );
  }
});
