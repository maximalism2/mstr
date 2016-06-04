import React, { Component, PropTypes } from 'react';
import Input from '../../../../../common/components/InputForPriceEditing';
import cnames from 'classnames';

class Form extends Component {
  componentWillReceiveProps(nextProps) {
    let currentProducts = this.props.data.products;
    let nextProducts = nextProps.data.products;

    // If we receive new created product make it input
    if (currentProducts.length + 1 === nextProducts.length) {
      let { _id } = nextProducts[nextProducts.length - 1];
      this.props.actions.makeInput(_id, 'name');
    }
  }

  renderPriceTitle() {
    let { data, view, editMode, actions } = this.props;

    if (editMode.id === null && editMode.field === 'title') {
      return (
        <h1 className="title price-title">
          <Input
            data={data}
            type="name"
            isMainField
            notRequired
            placeholder="Назва каталогу..."
            ch={actions.changeMainField}
            onCreate={actions.createNewProduct}
            onBlur={actions.removeInput}
            showNotification={actions.showNotification}
            onError={actions.inputInsertError}
            hasError={editMode.hasError}
          />
        </h1>
      );
    } else if (data.name.length) {
      return (
        <h3
          className="title price-title"
          onClick={() => actions.makeInput(null, 'title')}
        >
          {data.name}
        </h3>
      );
    } else {
      return (
        <h3
          className="title price-title not-fieled"
          onClick={() => actions.makeInput(null, 'title')}
        >
          Назва каталогу... <span className="icon is-required">*</span>
        </h3>
      );
    }
  }

  renderDiscount() {
    let { data, view, editMode, actions } = this.props;

    if (editMode.id === null && editMode.field === 'discount') {
      return (
        <p className="discount">
          Знижка:
          <span className="discount-value">
            <Input
              data={data}
              type="discount"
              isMainField
              onBlur={actions.removeInput}
              hasError={editMode.hasError}
              ch={actions.changeMainField}
              onCreate={actions.createNewProduct}
              only="number"
              notRequired
              countFrom={0}
              countTo={100}
              showNotification={actions.showNotification}
              onError={actions.inputInsertError}
              hasError={editMode.hasError}
            />
          </span>
        </p>
      );
    } else {
      return (
        <p
          className="discount"
          onClick={() => actions.makeInput(null, 'discount')}
        >
          Знижка: <span className="discount-value">{data.discount + "%"}</span>
        </p>
      );
    }
  }

  renderCurrency() {
    let { data, view, editMode, actions } = this.props;

    let currencyValueCName = cnames({
      "currency-value": true,
      [data.currency]: true
    });

    let isCurrencyInput = editMode.id === null && editMode.field === 'currency';

    if (isCurrencyInput) {
      return (
        <p className="currency is-active">
          Валюта:
          <span
            className="currency-value"
          >
            <Input
              data={data}
              type="currency"
              isMainField
              notRequired
              ch={actions.changeMainField}
              onCreate={actions.createNewProduct}
              onBlur={actions.removeInput}
              showNotification={actions.showNotification}
              onError={actions.inputInsertError}
              hasError={editMode.hasError}
            />
          </span>
        </p>
      );
    } else {
      let currency = 'UAH (₴)';
      let valueClassName = 'currency-value';
      switch (data.currency) {
        case 'USD': {
          valueClassName += ' USD';
          currency = 'USD ($)';
          break;
        }
        case 'EUR': {
          valueClassName += ' EUR';
          currency = 'EUR (€)';
          break;
        }
        case 'UAH': // Is default value
        default: {
          valueClassName += ' UAH';
          currency = 'UAH (₴)';
          break;
        }
      }

      return (
        <p className="currency">
          Валюта: {" "}
          <span className={valueClassName}>
            {!isCurrencyInput && 
              <span
                onClick={() => actions.makeInput(null, 'currency')}
              >
                {currency}
              </span>
            }
          </span>
        </p>
      );
    }
  }

  renderProduct(data, index, origin) {
    let { view, editMode, actions } = this.props;

    let canBeInput = !editMode.hasError;

    let nameCol = (
      <td
        className="name-column"
        onClick={() => canBeInput ? actions.makeInput(data._id, 'name') : null}
      >
        {data.name ? data.name : <span className="not-fieled">Назва товару...</span>}
      </td>
    );

    if (editMode.id === data._id && editMode.field === 'name') {
      nameCol = (
        <td className="name-column editing">
          <Input
            type="name"
            data={data}
            productsIndex={index}
            productsPlural={origin}
            editMode={editMode}
            onBlur={actions.removeInput}
            ch={actions.changeProductField}
            onCreate={actions.createNewProduct}
            makeInput={actions.makeInput}
            showNotification={actions.showNotification}
            onError={actions.inputInsertError}
            hasError={editMode.hasError}
          />
        </td>
      );
    }

    let unitCol = (
      <td
        className="unit-column"
        onClick={() => canBeInput ? actions.makeInput(data._id, 'unitOfMeasurement') : null}
      >
        {data.unitOfMeasurement}
      </td>
    );

    if (editMode.id === data._id && editMode.field === 'unitOfMeasurement') {
      unitCol = (
        <td className="unit-column editing">
          <Input
            type="unitOfMeasurement"
            data={data}
            productsIndex={index}
            productsPlural={origin}
            editMode={editMode}
            onBlur={actions.removeInput}
            ch={actions.changeProductField}
            onCreate={actions.createNewProduct}
            makeInput={actions.makeInput}
            showNotification={actions.showNotification}
            onError={actions.inputInsertError}
            hasError={editMode.hasError}
          />
        </td>
      );
    }

    let costCol = (
      <td
        className="cost-column"
        onClick={() => canBeInput ? actions.makeInput(data._id, 'cost') : null}
      >{data.cost}</td>
    );

    if (editMode.id === data._id && editMode.field === 'cost') {
      costCol = (
        <td
          className="cost-column editing"
          onClick={() => view.editMode ? actions.makeInput(data._id, 'cost') : null}
        >
          <Input
            type="cost"
            data={data}
            productsIndex={index}
            productsPlural={origin}
            editMode={editMode}
            only="number"
            countFrom={0}
            onBlur={actions.removeInput}
            ch={actions.changeProductField}
            onCreate={actions.createNewProduct}
            makeInput={actions.makeInput}
            showNotification={actions.showNotification}
            onError={actions.inputInsertError}
            hasError={editMode.hasError}
          />
        </td>
      );
    }

    let rowCName = cnames({
      "active-row": data._id === editMode.id
    });

    return (
      <tr
        className={rowCName}
        key={data._id}
      >
        <td className="number-column">
          <div className="controls">
            <div
              className="remove-button"
              onClick={() => this.removeProductHandler(data)}
            >
              <i className="fa fa-times" title="Видалити пункт"></i>
            </div>
          </div>
          <div className="counter">{index + 1}</div>
        </td>
        {nameCol}
        {unitCol}
        {costCol}
      </tr>
    );
  }

  removeProductHandler(productBeRemoved) {
    let { actions, editMode, data } = this.props;

    if (editMode.hasError) {
      actions.inputInsertError(false);
    }
    actions.removeNewProduct(productBeRemoved._id);
  }

  render() {
    let { data, view, editMode, actions } = this.props;
    let { products } = data;

    let tbodyCNames = cnames({
      "table-body body-of-new-price": true,
      "empty": !data.products.length,
      "has-error": editMode.hasError
    })

    return (
      <div className="container">
        <div className="price-content container new-price">
          <div className="main-info content-container">
            {this.renderPriceTitle()}
            <div className="sub-main">
              {this.renderDiscount()}
              {this.renderCurrency()}
            </div>
          </div>
        </div>

        <div className="products-list content-container">
          <table className="table content-container">
            <thead className="table-header">
              <tr>
                <th className="number-column">
                  <div className="controls">
                    <div
                      className="add-button"
                      onClick={() => actions.createNewProduct()}
                    >
                      <i className="fa fa-plus" title="Додати пункт (Ctrl + Enter)"></i>
                    </div>
                  </div>
                  №
                </th>
                <th className="name-column">Назва</th>
                <th>Одиниці вим.</th>
                <th className="cost-column">Ціна</th>
              </tr>
            </thead>
            <tbody className={tbodyCNames}>
              {(() => {
                let copy = JSON.parse(JSON.stringify(data.products));
                if (copy.length) {
                  return copy.reverse().map((product, index, origin) =>
                    this.renderProduct(product, index, origin)
                  );
                } else {
                  return (
                    <tr>
                      <td colSpan="4">
                        <div className="no-products">
                          <i className="arrow-icon"></i>
                          <span className="not-fieled">
                            В каталозі ще не створено жодного елементу. Створіть його!
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                }
              })()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

Form.propTypes = {
  data: PropTypes.object.isRequired,
  view: PropTypes.object.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired
}

export default Form;
