import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import { Header, Content } from '../components';

class PriceContainer extends Component {
  componentDidMount() {
    let { id } = this.props.params;
    this.props.dispatch(actions.fetchPriceById(id));
  }

  render() {
    return (
      <div className="prices content">
        <Header />
      </div>
    );
  }
}

function select(state) {
  return {
    price: state.price
  }
}

export default connect(select)(PriceContainer);
