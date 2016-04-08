import React, { Component, PropTypes } from 'react';

export default class PricesContainer extends Component {
  render() {
    return (
      <h1>Hello prices container</h1>
    );
  }
}

PricesContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  prices: PropTypes.object.isRequired
}
