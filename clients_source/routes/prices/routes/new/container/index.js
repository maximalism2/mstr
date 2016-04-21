import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Header, Form } from '../components';
import * as actions from '../actions';

class NewPriceContainer extends Component {
  constructor(props) {
    super(props);

    this.changeField = this.changeField.bind(this);
    this.makeInput = this.makeInput.bind(this);
    this.addRow = this.addRow.bind(this);
    this.removeRow = this.removeRow.bind(this);
    this.createPrice = this.createPrice.bind(this);
  }

  changeField(field) {
    this.props.dispatch(actions.changeField(field));
  }

  makeInput(index) {
    this.props.dispatch(actions.makeInput(index));
  }

  addRow() {
    this.props.dispatch(actions.addRow());
  }

  removeRow(index) {
    this.props.dispatch(actions.removeRow(index));
  }

  createPrice() {
    let { dispatch, newPrice } = this.props;
    console.log('create price => ', newPrice.data);
    dispatch(actions.createPrice(newPrice.data));
  }

  render() {
    let { newPrice } = this.props;
    let actionsForComponents = {
      changeField: this.changeField,
      makeInput: this.makeInput,
      addRow: this.addRow,
      removeRow: this.removeRow,
      createPrice: this.createPrice
    }

    return (
      <div>
        <Header
          actions={actionsForComponents}
        />
        <Form
          data={newPrice.data}
          view={newPrice.view}
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
