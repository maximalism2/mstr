import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class OrdersContainer extends Component {
  render() {
    return (
      <div className="orders-list">
        <h1 className="title">Orders!!!</h1>
      </div>
    );
  }
}

function select(state) {
  return {
    orders: state.orders
  }
}

export default connect(select)(OrdersContainer);