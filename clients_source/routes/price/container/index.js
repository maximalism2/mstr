import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { showNotification } from '../../../common/notifications/actions';
import * as actions from '../actions';

import { Header, Content, EditModeControls } from '../components';

class PriceContainer extends Component {
  constructor(props, context) {
    super();

    this.editModeOn = this.editModeOn.bind(this);
    this.editModeOff = this.editModeOff.bind(this);
    this.willRemove = this.willRemove.bind(this);
    this.makeInput = this.makeInput.bind(this);
    this.removeInput = this.removeInput.bind(this);
    this.changeProductField = this.changeProductField.bind(this);
    this.changeMainField = this.changeMainField.bind(this);
    this.remove = this.remove.bind(this);
    this.updatePrice = this.updatePrice.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.cancelRemovingProduct = this.cancelRemovingProduct.bind(this);
  }

  editModeOn() {
    this.props.dispatch(actions.editModeOn(this.props.price.data));
  }

  editModeOff() {
    this.props.dispatch(actions.editModeOff());
  }

  makeInput(id, field) {
    let { editMode } = this.props.price;
    if (id === null && field === null && editMode.id !== null && editMode.field !== null) {
      this.removeInput();
    } else if (field !== null){
      this.props.dispatch(actions.makeInput(id, field));
    }
  }

  removeInput() {
    this.props.dispatch(actions.removeInput());
  }

  willRemove(flag) {
    flag = flag !== undefined ? flag : false;
    this.props.dispatch(actions.willRemove(flag));
  }

  remove() {
    let { id } = this.props.params;
    this.props.dispatch(actions.remove(id));
  }

  updatePrice() {
    let { id } = this.props.params;
    let { data } = this.props.price.editMode;
    this.props.dispatch(actions.updatePrice(id, data));
  }

  changeProductField(productId, field, value) {
    this.props.dispatch(actions.changeProductField(productId, field, value));
  }

  changeMainField(field, value) {
    this.props.dispatch(actions.changeMainField(field, value));
  }

  removeProduct(id) {
    this.props.dispatch(actions.removeProduct(id));
  }

  cancelRemovingProduct(id) {
    this.props.dispatch(aactions.cancelRemovingProduct(id));
  }

  componentWillReceiveProps(nextProps) {
    // If price is deleted successfully go to /prices/ route
    if (nextProps.price.view.removingSuccess) {
      this.props.history.push('/prices/');
    }

    // Register the click event listener
    let currView = this.props.price.view;
    let nextView = nextProps.price.view;

    if (!currView.updatingSuccess && nextView.updatingSuccess) {
      let notificationMessage = `Каталог "${this.props.price.editMode.data.name}" успішно оновлений`
      this.props.dispatch(showNotification('info', notificationMessage));
      this.props.dispatch(actions.resetPriceView());
    }

    if (!currView.editMode && nextView.editMode) { // If edit mode is turned on
      window.addEventListener('click', this.makeInput(null, null), false);
    } else if (currView.editMode && !nextView.editMode) { // If it turned off
      document.body.removeEventListener('click', this.makeInput);
    }
  }

  componentDidMount() {
    let { id } = this.props.params;
    this.props.dispatch(actions.fetchPriceById(id));
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.makeInput);
  }

  render() {
    let { price } = this.props;
    let actionsForComponents = {
      editModeOn: this.editModeOn,
      editModeOff: this.editModeOff,
      willRemove: this.willRemove,
      makeInput: this.makeInput,
      removeInput: this.removeInput,
      remove: this.remove,
      changeProductField: this.changeProductField,
      changeMainField: this.changeMainField,
      updatePrice: this.updatePrice,
      removeProduct: this.removeProduct,
      cancelRemovingProduct: this.cancelRemovingProduct
    }

    return (
      <div className="prices content">
        <Header
          actions={actionsForComponents}
          view={price.view}
        />
        <EditModeControls
          data={price.data}
          view={price.view}
          anumationDuration={300}
          actions={actionsForComponents}
        />
        <Content
          data={price.data}
          view={price.view}
          editMode={price.editMode}
          actions={actionsForComponents}
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
