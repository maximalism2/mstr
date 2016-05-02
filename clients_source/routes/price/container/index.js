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
    let { price } = this.props;
    let actionsForComponents = {}
    return (
      <div className="prices content">
        <Header
          actions={actionsForComponents}
        />
        <Content
          data={price.data}
          view={price.view}
        />
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
