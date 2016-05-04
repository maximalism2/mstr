import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import { Header, Content } from '../components';

class PriceContainer extends Component {
  constructor(props, context) {
    super();

    this.editModeOn = this.editModeOn.bind(this);
    this.editModeOff = this.editModeOff.bind(this);
    this.remove = this.remove.bind(this);
  }

  editModeOn() {
    this.props.dispatch(actions.editModeOn());
  }

  editModeOff() {
    this.props.dispatch(actions.editModeOff());
  }

  componentDidMount() {
    let { id } = this.props.params;
    this.props.dispatch(actions.fetchPriceById(id));
  }

  remove() {
    let { id } = this.props.params;
    this.props.dispatch(actions.remove(id));
  }

  render() {
    let { price } = this.props;
    let actionsForComponents = {
      editModeOn: this.editModeOn,
      editModeOff: this.editModeOff,
      remove: this.remove
    }

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
