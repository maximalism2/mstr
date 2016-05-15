import React, { Component, PropTypes } from 'react';
import { Header, PriceList } from '../components/';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { resetPriceView } from '../../price/actions';
import { showNotification } from '../../../common/notifications/actions';

class PricesContainer extends Component {
  constructor() {
    super();

    this.fetchPrices = this.fetchPrices.bind(this);
    this.fetchPriceById = this.fetchPriceById.bind(this);
    this.scrollHandler = this.scrollHandler.bind(this);
  }

  componentWillMount() {
    let { price } = this.props;
    if (price.view.removingSuccess) {
      console.info('Price is removed successfully, reseted price view, show notification');
      this.props.dispatch(resetPriceView());

      let notificationMessage = `Каталог "${price.data.name}" успішно видалений`
      this.props.dispatch(showNotification('success', notificationMessage));
    }

    window.addEventListener('scroll', this.scrollHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler);
    document.body.className = "";
  }

  scrollHandler(event) {
    let st = event.target.scrollingElement.scrollTop;
    let b = document.body;

    if (st > 55) {
      b.className = "scrolled";
    } else {
      b.className = "";
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.price.view.editMode) {
      this.props.dispatch(resetPriceView());
    }
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
    prices: state.prices,
    price: state.price,
    notification: state.norification
  };
}

export default connect(select)(PricesContainer);
