import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class NewPriceContainer extends Component {
  render() {
    return (
      <h1 className="title">New price</h1>
    );
  }
}

NewPriceContainer.propTypes = {
  newPrice: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function select(state) {
  return {
    newPrice: state.newPrice
  };
}

export default connect(select)(NewPriceContainer);
