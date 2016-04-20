import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Header, Form } from '../components';

class NewPriceContainer extends Component {
  render() {
    return (
      <div>
        <Header />
        <Form />
      </div>
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
