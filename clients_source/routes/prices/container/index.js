import React, { Component, PropTypes } from 'react';
import { Header, PriceList } from '../components/';
import { connect } from 'react-redux';
import * as actions from '../actions';

class PricesContainer extends Component {
  constructor() {
    super();

    this.fetchPrices = this.fetchPrices.bind(this);
    this.fetchPriceById = this.fetchPriceById.bind(this);
  }

  fetchPrices(flag) {
    this.props.dispatch(actions.fetchPrices(flag));
  }

  fetchPriceById(id) {
    this.props.dispatch(actions.fetchPriceById(id));
  }

  render() {
    let { prices, location, children } = this.props;
    let actionsForComponents = {
      fetchPrices: this.fetchPrices,
      fetchPriceById: this.fetchPriceById
    }

    console.log('children', children);

    let pn = location.pathname;
    if ((pn === '/prices/' || pn === 'prices/')  && children === null) {
      return (
        <div className="prices content">
          <Header />
          <PriceList
            data={prices.data}
            view={prices.view}
            actions={actionsForComponents}
          />
        </div>
      );
    } else if ((pn === '/prices/new/' || pn === 'prices/new/') && children) {
      return (
        <div className="prices content">
          {children}
        </div>
      );
    } else {
      return (
        <p style={{textAlign: 'center'}}>
          some error
        </p>
      );
    }
  }
}

function select(state) {
  return {
    prices: state.prices
  };
}

export default connect(select)(PricesContainer);
