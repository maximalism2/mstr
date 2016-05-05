import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import { Header, Content } from '../components';

class PriceContainer extends Component {
  constructor(props, context) {
    super();

    this.editModeOn = this.editModeOn.bind(this);
    this.editModeOff = this.editModeOff.bind(this);
    this.willRemove = this.willRemove.bind(this);
    this.remove = this.remove.bind(this);
  }

  editModeOn() {
    this.props.dispatch(actions.editModeOn());
  }

  editModeOff() {
    this.props.dispatch(actions.editModeOff());
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  componentDidMount() {
    let { id } = this.props.params;
    this.props.dispatch(actions.fetchPriceById(id));

    window.addEventListener('scroll', this.scrollHandler, false);
  }

  componentWillReceiveProps(nextProps) {
    // If price is deleted successfully go to /prices/ route
    if (nextProps.price.view.removingSuccess) {
      this.props.history.push('/prices/');
    }
  }

  scrollHandler(event) {
    let st = event.target.scrollingElement.scrollTop;
    let b = document.body;

    if (st <= 55) { b.className = ""; }
    if (st > 55) { b.className = "scrolled-price"; }
    if (st > 105 && b.className !== "scrolled-price with-main-info") {
      b.className = "scrolled-price with-main-info";
    }
  }

  willRemove(flag) {
    flag = flag !== undefined ? flag : false;
    this.props.dispatch(actions.willRemove(flag));
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
      willRemove: this.willRemove,
      remove: this.remove
    }

    return (
      <div className="prices content">
        <Header
          actions={actionsForComponents}
          view={price.view}
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
