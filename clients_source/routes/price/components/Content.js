import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import Loader from '../../../common/components/loader';
import cnames from 'classnames';

class Error extends Component {
  render() {
    return (
      <div className="container fetching-error-box">
        <p className="title size-5 fetching-error-title">
          Вибачте, у нас виникли технічні проблеми...
          <br />
          Будь ласка. спробуйте ще раз пізніше
        </p>
      </div>
    );
  }
}

class Input extends Component {
  constructor() {
    super();

    this.walkOnFields = this.walkOnFields.bind(this);
    this.needToExit = this.needToExit.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.blurHandler = this.blurHandler.bind(this);
    this.createByKeyBoard = this.createByKeyBoard.bind(this);
    this.rightPad = this.rightPad.bind(this);
  }

  createByKeyBoard(e) {
    if (e.ctrlKey && e.shiftKey && e.which === 13) {
      e.preventDefault();
      let { showNotification, onError, onCreate } = this.props;
      if (e.target.value === '') {
        let message = 'Це поле не може бути порожнім';
        showNotification('danger', message);
        onError();
        e.target.focus();
      } else {
        onCreate();
      }
    }
  }

  needToExit(e) {
    if (e.which === 27) {
      // If esc is pressed do the same that on blur event
      this.blurHandler(e);
    }
  }

  walkOnFields(e) {
    // When user press crtl + shift and any arrow, we check if exists field in
    // arrows direction, and do makeInput(id, this.props.type);
    // Also user cat preaa Tab and focus must to walk to next column or next row

    // If field is empty - do nothing
    if (e.target.value.length === 0) {
      return;
    }

    let { only } = this.props;
    let isNumberField = only === 'number';

    if (e.ctrlKey && e.shiftKey) {
      e.preventDefault();
      let { data, type, editMode, productsIndex, productsPlural } = this.props;
      switch (e.which) {
        case 37: {
          let productsFields = ["name", "unitOfMeasurement", "cost"];
          let columntIndex = productsFields.indexOf(type);
          if (columntIndex > 0) {
            if (isNumberField) {
              this.rightPad(e);
            }
            this.props.makeInput(data._id, productsFields[columntIndex - 1]);
          }
          break;
        }
        case 38: {
          if (productsIndex > 0) {
            for (let i = 1; i <= productsIndex; i++) {
              let id = productsPlural[productsIndex - i]._id;
              let isNextRemoved = editMode.productsWillRemove.includes(id);
              if (!isNextRemoved) {
                if (isNumberField) {
                  this.rightPad(e);
                }
                this.props.makeInput(id, type);
                break;
              }
            }
            break;
          } else {
            break;
          }
        }
        case 39: {
          let productsFields = ["name", "unitOfMeasurement", "cost"];
          let columntIndex = productsFields.indexOf(type);
          if (columntIndex < productsFields.length - 1) {
            if (isNumberField) {
              this.rightPad(e);
            }
            this.props.makeInput(data._id, productsFields[columntIndex + 1]);
          }
          break;
        }
        case 40: {
          if (productsPlural[productsIndex + 1]) {
            for (let i = 1; i < (productsPlural.length - productsIndex); i++) {
              let id = productsPlural[productsIndex + i]._id;
              let isNextRemoved = editMode.productsWillRemove.includes(id);
              if (!isNextRemoved) {
                if (isNumberField) {
                  this.rightPad(e);
                }
                this.props.makeInput(id, type)
                break;
              }
            }
          } else {
            break;
          }
        }
      }
    }


    // On tab pressed handler
    if (e.which === 9 && !e.shiftKey) {
      e.preventDefault();
      let { data, type, editMode, productsIndex, productsPlural } = this.props;

      // Firstly try to go to the next column
      let canGoToColumn = true;
      let productsFields = ["name", "unitOfMeasurement", "cost"];
      let columntIndex = productsFields.indexOf(type);
      if (columntIndex < productsFields.length - 1) {
        if (isNumberField) {
          this.rightPad(e);
        }
        this.props.makeInput(data._id, productsFields[columntIndex + 1]);
      } else {
        canGoToColumn = false;
      }

      // If we cannot go to the next column - try to jump to the next row
      // at the first column
      if (productsPlural[productsIndex + 1] && !canGoToColumn) {
        for (let i = 1; i < (productsPlural.length - productsIndex); i++) {
          let id = productsPlural[productsIndex + i]._id;
          let isNextRemoved = editMode.productsWillRemove.includes(id);
          if (!isNextRemoved) {
            if (isNumberField) {
              this.rightPad(e);
            }
            this.props.makeInput(id, productsFields[0]);
            return;
          }
        }
      }
    }

    // On Shift + Tab pressed handler
    if (e.which === 9 && e.shiftKey) {
      e.preventDefault();
      let { data, type, editMode, productsIndex, productsPlural } = this.props;

      // Here also try to move on columns
      let canGoToColumn = true;
      let productsFields = ["name", "unitOfMeasurement", "cost"];
      let columntIndex = productsFields.indexOf(type);
      if (columntIndex > 0) {
        if (isNumberField) {
          this.rightPad(e);
        }
        this.props.makeInput(data._id, productsFields[columntIndex - 1]);
      } else {
        canGoToColumn = false
      }

      if (productsIndex > 0 && !canGoToColumn) {
        for (let i = 1; i <= productsIndex; i++) {
          let id = productsPlural[productsIndex - i]._id;
          let isNextRemoved = editMode.productsWillRemove.includes(id);
          if (!isNextRemoved) {
            if (isNumberField) {
              this.rightPad(e);
            }
            this.props.makeInput(id, productsFields[productsFields.length - 1]);
            return;
          }
        }
      }
    }
  }

  changeHandler(e) {
    let {
      data, type, only, showNotification, isMainField, ch, hasError, onError,
      countFrom, countTo
    } = this.props;
    let id = data._id;

    if (hasError && e.target.value.length) {
      onError(false);
    }

    switch (only) {
      case 'number': {
        let { value } = e.target;
        if (value.length) {

          let check = Number(value);
          if (isNaN(check)) {
            let message = 'Допустимі дані тільки числового типу';
            showNotification('warning', message);
          } else {
            let isInRange = true;

            if (countFrom !== undefined && check < countFrom) {
              let message = `Значення повинне бути більше нуля ${countFrom}`;
              showNotification('warning', message);
              isInRange = false;
            }

            if (countTo !== undefined && check > countTo) {
              let message = `Значення повинне бути менше ніж ${countTo}`;
              showNotification('warning', message);
              isInRange = false;
            }

            if (isInRange) {
              if (isMainField) {
                ch(type, value);
              } else {
                ch(id, type, value);
              }
            }
          }
        } else {
          if (isMainField) {
            ch(type, value);
          } else {
            ch(id, type, value);
          }
        }
        break;
      }
      default: {
        if (isMainField) {
          ch(type, e.target.value);
        } else {
          ch(id, type, e.target.value)
        }
      }
    }
  }

  rightPad(e) {
    // If value ending by dot or if value is integer add to end '.0' or '0'
    let { isMainField, ch, data, type } = this.props;
    let { value } = e.target;
    let needToChange = false;

    let hasDot = value.indexOf('.') !== -1;

    if (value[value.length - 1] === '.') {
      value = value + '0';
      needToChange = true;
    }
    if (Number(value) % 1 === 0 && !needToChange && !hasDot) {
      value = value + '.0';
      needToChange = true;
    }
    if (needToChange) {
      if (isMainField) {
        ch(type, value);
      } else {
        ch(data._id, type, value);
      }
    }
  }

  blurHandler(e) {
    let { showNotification, onError, onBlur, only } = this.props;
    let { value } = e.target;

    if (value.length === 0) {
      let message = 'Це поле не може бути порожнім';
      showNotification('danger', message);
      onError();
      e.target.focus();
    } else {
      if (only === 'number') {
        this.rightPad(e);
      }
      onBlur();
    }
  }

  componentDidMount() {
    let DOMInput = findDOMNode(this);

    if (this.props.type === 'currency') {
      // If it is select get dom node 'select'
      DOMInput = DOMInput.childNodes[0];
    } else {
      // If type of input is 'text' - select it all
      DOMInput.setSelectionRange(0, DOMInput.value.length);
    }
    DOMInput.focus();
  }

  render() {
    let { data, type, isMainField, ch, onBlur } = this.props;

    if (this.props.isMainField) {
      if (type === 'currency') {
        return (
          <span className="select">
            <select
              className={data.currency}
              value={data.currency}
              onChange={e => this.changeHandler(e)}
              onBlur={e => this.blurHandler(e)}
            >
              <option value="UAH" className="uah">UAH (₴)</option>
              <option value="USD" className="usd">USD ($)</option>
              <option value="EUR" className="eur">EUR (€)</option>
            </select>
          </span>
        );
      } else {
        return (
          <input
            type="text"
            className="input"
            value={data[type]}
            onBlur={e => this.blurHandler(e)}
            onKeyDown={e => this.needToExit(e)}
            onChange={e => this.changeHandler(e)}
          />
        );
      }
    } else {
      return (
        <input
          type="text"
          className="input"
          value={data[type]}
          onBlur={e => this.blurHandler(e)}
          onKeyDown={e => {
            this.walkOnFields(e);
            this.needToExit(e);
            this.createByKeyBoard(e);
          }}
          onChange={e => this.changeHandler(e)}
        />
      );
    }
  }
}

Input.propTypes = {
  data: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  ch: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  hasError: PropTypes.bool.isRequired,
  makeInput: PropTypes.func,
  only: PropTypes.string,
  countFrom: PropTypes.number,
  countTo: PropTypes.number,
  isMainField: PropTypes.bool,
  productsIndex: PropTypes.number,
  productsPlural: PropTypes.arrayOf(PropTypes.object)
}

class Content extends Component {
  renderPriceTitle() {
    let { data, view, editMode, actions } = this.props;

    if (view.editMode && editMode.field === 'title') {
      return (
        <h1 className="title price-title">
          <Input
            data={editMode.data}
            type="name"
            isMainField
            ch={actions.changeMainField}
            onCreate={actions.createNewProduct}
            onBlur={actions.removeInput}
            showNotification={actions.showNotification}
            onError={actions.inputInsertError}
            hasError={editMode.hasError}
          />
        </h1>
      );
    } else if (view.editMode) {
      return (
        <h1
          className="title price-title"
          onClick={() => actions.makeInput(null, 'title')}
        >
          {editMode.data.name.length ? editMode.data.name : data.name}
        </h1>
      );
    } else { // If default mode
      return (
        <h1
          className="title price-title"
        >{data.name}</h1>
      );
    }
  }

  renderDiscount() {
    let { data, view, editMode, actions } = this.props;

    if (view.editMode && editMode.field === 'discount') {
      return (
        <p className="discount">
          Знижка:
          <span className="discount-value">
            <Input
              data={editMode.data}
              type="discount"
              isMainField
              onBlur={actions.removeInput}
              hasError={editMode.hasError}
              ch={actions.changeMainField}
              onCreate={actions.createNewProduct}
              only="number"
              countFrom={0}
              countTo={100}
              showNotification={actions.showNotification}
              onError={actions.inputInsertError}
              hasError={editMode.hasError}
            />
          </span>
        </p>
      );
    } else if (view.editMode) {
      return (
        <p
          className="discount"
          onClick={() => actions.makeInput(null, 'discount')}
        >
          Знижка: <span className="discount-value">{editMode.data.discount + "%"}</span>
        </p>
      );
    } else {
      return (
        <p className="discount">
          Знижка: <span className="discount-value">{data.discount + "%"}</span>
        </p>
      );
    }
  }

  renderCurrency() {
    let { data, view, editMode, actions } = this.props;

    let currencyValueCName = cnames({
      "currency-value": true,
      [editMode.data.currency]: true
    });

    let isCurrencyInput = (editMode.id === null) && (editMode.field === 'currency');
    console.log(isCurrencyInput, editMode);

    if (view.editMode && isCurrencyInput) {
      return (
        <p className="currency is-active">
          Валюта:
          <span
            className="currency-value"
          >
            <Input
              data={editMode.data}
              type="currency"
              isMainField
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
    } else if (view.editMode && !isCurrencyInput) {
      let currency = 'UAH (₴)';
      let valueClassName = 'currency-value';
      switch (editMode.data.currency) {
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
    } else {
      let currency = 'UAH (₴)';
      let valueClassName = "currency-value"
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
            {currency}
          </span>
        </p>
      );
    }
  }

  removeProductHandler(productBeRemoved) {
    let { actions, editMode, data } = this.props;

    if (productBeRemoved.new) {
      actions.removeNewProduct(productBeRemoved._id);
    } else {
      if (editMode.hasError) {
        if (editMode.id) {
          let { id, field } = editMode;
          let itemInStaticPrice = null;
          let itemInEditMode = editMode.data.products.filter(product => product._id === id)[0];

          if (itemInEditMode.new) {
            // Take previous product
            let indexOfPrevious = data.products.length - 1;
            itemInStaticPrice = data.products[indexOfPrevious];
          } else {
            itemInStaticPrice = data.products.filter(product => product._id === id)[0];
          }
          let value = itemInStaticPrice[field];
          actions.inputInsertError(false);
          actions.removeInput();
          actions.changeProductField(id, field, value);
        } else if (editMode.field) {
          let { field } = editMode;
          let value = data[field];
          actions.removeInput();
          actions.inputInsertError(false);
          actions.changeMainField(field, value);
        }
      }
      actions.removeProduct(productBeRemoved._id);
    }
  }

  componentWillReceiveProps(nextProps) {
    let currentProducts = this.props.editMode.data.products;
    let nextProducts = nextProps.editMode.data.products;
    let { editMode } = this.props.view;

    let isFullEditMode = editMode && nextProducts;
    // If we receive new created product make it input
    if (isFullEditMode && currentProducts.length + 1 === nextProducts.length) {
      let { _id } = nextProducts[nextProducts.length - 1];
      this.props.actions.makeInput(_id, 'name');
    }

    this.props.actions.updateCounters();
  }

  renderProduct(data, index, origin) {
    let { view, editMode, actions } = this.props;

    let canBeInput = (
      view.editMode &&
      !editMode.productsWillRemove.includes(data._id) &&
      !editMode.hasError
    );

    let nameCol = (
      <td
        className="name-column"
        onClick={() => canBeInput ? actions.makeInput(data._id, 'name') : null}
      >
        {data.name}
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
      "active-row": data._id === editMode.id,
      "will-be-removed": editMode.productsWillRemove.includes(data._id),
      "new-product": data.new
    });

    return (
      <tr
        className={rowCName}
        key={data._id}
      >
        <td className="number-column">
          {view.editMode &&
            <div className="controls">
              {!editMode.productsWillRemove.includes(data._id) &&
                <div
                  className="remove-button"
                  onClick={() => this.removeProductHandler(data)}
                >
                  <i className="fa fa-times" title="Видалити пункт"></i>
                </div>
              }
              {editMode.productsWillRemove.includes(data._id) &&
                <button
                  className="cancel-removing-btn"
                  onClick={() => actions.cancelRemovingProduct(data._id)}
                >Скасувати видалення</button>
              }
            </div>
          }
          <div className="counter">{index + 1}</div>
        </td>
        {nameCol}
        {unitCol}
        {costCol}
      </tr>
    );
  }

  renderContent() {
    let { data, view, editMode, actions } = this.props;
    let updatedAt = data.updatedAt ? (new Date(data.updatedAt)).toLocaleDateString() : null;

    let containerCName = cnames({
      "price-content": true,
      "container": true,
      "edit-mode": view.editMode,
      "has-error": view.editMode && editMode.hasError
    });

    let editModeStyles = {};
    if (view.editMode) {

      let translateYValue = (() => {
        let DOMElement = document.getElementById('priceContainer');
        let height = DOMElement.offsetHeight;
        return (height * 1.05 - height) / 2;
      })();

      editModeStyles = {
        transform: `translateY(${translateYValue}px) scale(1.05)`
      }
    }

    return (
      <div className={containerCName} style={editModeStyles} id="priceContainer">
        <div className="main-info content-container">
          <p className="updated-at">Оновлено: {updatedAt}</p>
          {this.renderPriceTitle()}
          <div className="sub-main">
            {this.renderDiscount()}
            {this.renderCurrency()}
          </div>
        </div>
        <div className="products-list content-container">
          <table className="table content-container">
            <thead className="table-header">
              <tr>
                <th className="number-column">
                  {view.editMode &&
                    <div className="controls">
                      <div
                        className="add-button"
                        onClick={() => actions.createNewProduct()}
                      >
                        <i className="fa fa-plus" title="Додати пункт (Ctrl + Enter)"></i>
                      </div>
                    </div>
                  }
                  №
                </th>
                <th className="name-column">Назва</th>
                <th>Одиниці вим.</th>
                <th className="cost-column">Ціна</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {(() => {
                if (view.editMode) {
                  let copy = JSON.parse(JSON.stringify(editMode.data.products));
                  return copy.reverse().map((product, index, origin) =>
                    this.renderProduct(product, index, origin)
                  );
                } else {
                  let copy = JSON.parse(JSON.stringify(data.products));
                  return copy.reverse().map((product, index, origin) =>
                    this.renderProduct(product, index, origin)
                  );
                }
              })()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  render() {
    let { view } = this.props;

    if (view.loading) {
      return <Loader />;
    } else if (view.error) {
      return <Error />;
    } else {
      return this.renderContent();
    } 
  }
}

export default Content;


// To edit cell need to add editing className for td and past input into it