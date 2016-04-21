import React, { Component, PropTypes } from 'react';
import { Header, PriceList } from '../components/';
import { connect } from 'react-redux';
import * as actions from '../actions';

class PricesContainer extends Component {
  constructor() {
    super();

    this.fetchPriceById = this.fetchPriceById.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(actions.fetchPrices());
  }

  fetchPriceById(id) {
    console.log('_id', id);
    this.props.dispatch(actions.fetchPriceById(id));
  }

  render() {
    let { prices, location, children } = this.props;
    let actionsForComponents = {
      fetchPriceById: this.fetchPriceById
    }

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
