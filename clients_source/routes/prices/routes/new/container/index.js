import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Header, Form, LinkToLogin } from '../components';
import { showNotification } from '../../../../../common/notifications/actions';
import * as actions from '../actions';

class NewPriceContainer extends Component {
  constructor(props) {
    super(props);

    this.resetPriceView = this.resetPriceView.bind(this);
    this.makeInput = this.makeInput.bind(this);
    this.removeInput = this.removeInput.bind(this);
    this.inputInsertError = this.inputInsertError.bind(this);
    this.changeProductField = this.changeProductField.bind(this);
    this.changeMainField = this.changeMainField.bind(this);
    this.createNewProduct = this.createNewProduct.bind(this);
    this.removeNewProduct = this.removeNewProduct.bind(this);
    this.createPrice = this.createPrice.bind(this);
    this.setCounters = this.setCounters.bind(this);
    this.showNotification = this.showNotification.bind(this);
    this.showLinkToLogin = this.showLinkToLogin.bind(this);
  }

  resetPriceView() {
    this.props.dispatch(actions.resetPriceView());
  }

  makeInput(id, field) {
    this.props.dispatch(actions.makeInput(id, field));
  }

  removeInput() {
    this.props.dispatch(actions.removeInput());
  }

  inputInsertError(flag) {
    this.props.dispatch(actions.inputInsertError(flag));
  }

  changeProductField(id, field, value) {
    this.props.dispatch(actions.changeProductField(id, field, value));
  }

  changeMainField(field, value) {
    this.props.dispatch(actions.changeMainField(field, value));
  }

  createNewProduct() {
    this.props.dispatch(actions.createNewProduct());
  }

  removeNewProduct(id) {
    this.props.dispatch(actions.removeNewProduct(id));
  }

  createPrice() {
    let { data } = this.props.newPrice;
    this.props.dispatch(actions.createPrice(data));
  }

  setCounters(counters) {
    this.props.dispatch(actions.setCounters(counters));
  }

  showNotification(type, message) {
    this.props.dispatch(showNotification(type, message));
  }

  showLinkToLogin() {
    this.props.dispatch(actions.showLinkToLogin());
  }

  componentWillReceiveProps(nextProps) {
    let currentView = this.props.newPrice.view;
    let nextView = nextProps.newPrice.view;

    if (!currentView.creatingSuccess && nextView.creatingSuccess) {
      let message = "Каталог успішно створений";
      this.showNotification('success', message);
      this.props.history.push(`/price/${nextProps.newPrice.data._id}/`);
    }

    if (!currentView.creatingError && typeof nextView.creatingError.status === 'number') {
      this.showNotification('danger', nextView.creatingError.message);

      if (nextView.creatingError.status === 401) {
        this.showLinkToLogin();
      }
    }
  }

  render() {
    let { newPrice, dispatch } = this.props;
    let actionsForComponents = {
      resetPriceView: this.resetPriceView,
      makeInput: this.makeInput,
      removeInput: this.removeInput,
      inputInsertError: this.inputInsertError,
      changeProductField: this.changeProductField,
      changeMainField: this.changeMainField,
      createNewProduct: this.createNewProduct,
      removeNewProduct: this.removeNewProduct,
      createPrice: this.createPrice,
      setCounters: this.setCounters,
      showNotification: this.showNotification,
      showLinkToLogin: this.showLinkToLogin
    }

    return (
      <div>
        <Header
          view={newPrice.view}
          data={newPrice.data}
          actions={actionsForComponents}
        />
        {newPrice.view.needToShowLoginLink &&
          <LinkToLogin />
        }
        <Form
          data={newPrice.data}
          view={newPrice.view}
          editMode={newPrice.editMode}
          actions={actionsForComponents}
        />
      </div>
    );
  }
}

NewPriceContainer.propTypes = {
  newPrice: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function select(state) {
  return {
    newPrice: state.newPrice
  };
}

export default connect(select)(NewPriceContainer);
