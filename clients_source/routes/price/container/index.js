import React, { Component, PropTypes } from 'react';

class PriceContainer extends Component {
  render() {
    console.log('price props', this.props);
    return (
      <p>some text</p>
    );
  }
}

function select(state) {
  return {
    price: state.price
  }
}

export default PriceContainer;
