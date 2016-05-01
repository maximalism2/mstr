import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class PriceContainer extends Component {
  componentWillMount() {
    let { id } = this.props.params;
    console.log('actions', actions);
    console.log('props', this.props);
    this.props.dispatch(actions.fetchPriceById(id));
  }

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

export default connect(select)(PriceContainer);
