import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { showNotification } from '../../../common/notifications/actions';
import * as actions from '../actions';
import diff from 'deep-diff';

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
    this.showNotification = this.showNotification.bind(this);
    this.inputInsertError = this.inputInsertError.bind(this);
    this.resetPriceView = this.resetPriceView.bind(this);
    this.createNewProduct = this.createNewProduct.bind(this);
    this.removeNewProduct = this.removeNewProduct.bind(this);
    this.updateCounters = this.updateCounters.bind(this);
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

  inputInsertError(flag) {
    this.props.dispatch(actions.inputInsertError(flag));
  }

  updatePrice() {
    let { id } = this.props.params;
    let { data, productsWillRemove } = this.props.price.editMode;
    if (productsWillRemove.length) {
      let dp = data.products;
      let newProducts = dp.filter(p => !productsWillRemove.includes(p._id));
      data.products = newProducts;
    }

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
    this.props.dispatch(actions.cancelRemovingProduct(id));
  }

  showNotification(type, message) {
    this.props.dispatch(showNotification(type, message));
  }

  resetPriceView() {
    this.props.dispatch(actions.resetPriceView());
  }

  createNewProduct() {
    this.props.dispatch(actions.createNewProduct());
  }

  removeNewProduct(id) {
    this.props.dispatch(actions.removeNewProduct(id));
  }

  updateCounters() {
    let { data, view } = this.props.price;
    let editModeObject = this.props.price.editMode;

    let dataCopy = JSON.parse(JSON.stringify(data));
    let editCopy = JSON.parse(JSON.stringify(editModeObject.data));

    let counters = {
      created: 0,
      updated: 0,
      removed: 0
    }

    // Set number of removed products
    counters.removed = editModeObject.productsWillRemove.length;

    // Set number of created products
    if (Object.keys(editModeObject.data).length) {
      editModeObject.data.products.forEach(product => {
        if (product.new) {
          counters.created++;
        }
      });
    }

    // Set number of updated items, (not only in products)
    let diffResult = diff(dataCopy, editCopy);
    if (diffResult !== undefined) {
      diffResult.forEach(difference => {
        if (difference.kind === 'E') {
          counters.updated++;
        }
      });
    }

    if (diff(editModeObject.counters, counters) !== undefined) {
      this.props.dispatch(actions.setCounters(counters));
    }
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
      this.showNotification('info', notificationMessage);
      this.resetPriceView();
    }

    if (!currView.editMode && nextView.editMode) { // If edit mode is turned on
      window.addEventListener('click', this.makeInput(null, null), false);
    } else if (currView.editMode && !nextView.editMode) { // If it turned off
      document.body.removeEventListener('click', this.makeInput);
    }
  }

  componentDidMount() {
    let { id } = this.props.params;
    let { data } = this.props.price;
    if (!data._id || data._id !== id) {
      this.props.dispatch(actions.fetchPriceById(id));
    }
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
      cancelRemovingProduct: this.cancelRemovingProduct,
      showNotification: this.showNotification,
      inputInsertError: this.inputInsertError,
      resetPriceView: this.resetPriceView,
      createNewProduct: this.createNewProduct,
      removeNewProduct: this.removeNewProduct,
      updateCounters: this.updateCounters
    }

    console.log('something');

    return (
      <div className="prices content">
        <Header
          actions={actionsForComponents}
          view={price.view}
        />
        <EditModeControls
          data={price.data}
          view={price.view}
          errorExists={price.editMode.hasError}
          anumationDuration={300}
          actions={actionsForComponents}
          counters={price.editMode.counters}
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
