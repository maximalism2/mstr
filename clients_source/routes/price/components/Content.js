import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import Loader from '../../../common/components/loader';
import cnames from 'classnames';

import { diff } from 'deep-diff';

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
  }

  needToExit(e) {
    if (e.which === 27) {
      // If esc is pressed do the same that on blur event
      this.props.onBlur();
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

    if (e.ctrlKey && e.shiftKey) {
      e.preventDefault();
      let { data, type, editMode, productsIndex, productsPlural } = this.props;
      switch (e.which) {
        case 37: {
          let productsFields = ["name", "unitOfMeasurement", "cost"];
          let columntIndex = productsFields.indexOf(type);
          if (columntIndex > 0) {
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
        this.props.makeInput(data._id, productsFields[columntIndex - 1]);
      } else {
        canGoToColumn = false
      }

      if (productsIndex > 0 && !canGoToColumn) {
        for (let i = 1; i <= productsIndex; i++) {
          let id = productsPlural[productsIndex - i]._id;
          let isNextRemoved = editMode.productsWillRemove.includes(id);
          if (!isNextRemoved) {
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
            console.log(countFrom < check);

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

  blurHandler(e) {
    let { showNotification, onError, onBlur } = this.props;
    let { value } = e.target;

    if (value.length === 0) {
      let message = 'Це поле не може бути порожнім';
      showNotification('danger', message);
      onError();
      e.target.focus();
    } else {
      onBlur();
    }
  }

  componentDidMount() {
    let DOMInput = findDOMNode(this);
    DOMInput.setSelectionRange(0, DOMInput.value.length);
    DOMInput.focus();
  }

  render() {
    let { data, type, isMainField, ch, onBlur } = this.props;

    if (this.props.isMainField) {
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
        >{editMode.data.name.length ? editMode.data.name : data.name}</h1>
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

  removeProductHandler(data) {
    let { actions } = this.props;

    if (data.new) {
      actions.removeNewProduct(data._id);
    } else {
      actions.removeProduct(data._id);
    }
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
            onBlur={actions.removeInput}
            ch={actions.changeProductField}
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
            <p className="currency">
              Валюта: {" "}
              <span className="currency-value">UAH (₴)</span>
            </p>
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
                return editMode.newProducts.map((product, index, origin) =>
                  this.renderProduct(product, index, origin)
                );
              })()}
              {(() => {
                if (view.editMode) {
                  let deltaIndex = editMode.newProducts.length;
                  return editMode.data.products.map((product, index, origin) =>
                    this.renderProduct(product, deltaIndex + index, origin)
                  );
                } else {
                  return data.products.map((product, index, origin) =>
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
    let { data, view, editMode } = this.props;

    if (Object.keys(editMode.data).length) {
      console.log(diff(data, editMode.data));
    }

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