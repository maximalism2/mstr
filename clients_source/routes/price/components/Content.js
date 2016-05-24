import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import Loader from '../../../common/components/loader';
import cnames from 'classnames';

import { diff } from 'deep-diff';

var lhs = {
  name: 'ss',
  ss: '2'
}

var rhs = {
  name: 'dd'
}


class Input extends Component {
  constructor() {
    super();

    this.walkOnFields = this.walkOnFields.bind(this);
    this.needToExit = this.needToExit.bind(this);
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
          defaultValue={data[type]}
          onBlur={onBlur}
          onKeyDown={e => this.needToExit(e)}
          onChange={e => ch(type, e.target.value)}
        />
      );
    } else {
      return (
        <input
          type="text"
          className="input"
          defaultValue={data[type]}
          onBlur={onBlur}
          onKeyDown={e => {
            this.walkOnFields(e);
            this.needToExit(e);
          }}
          onChange={e => ch(data._id, type, e.target.value)}
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
  makeInput: PropTypes.func,
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
              ch={actions.changeMainField}
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

  renderProduct(data, index, origin) {
    let { view, editMode, actions } = this.props;

    let canBeInput = view.editMode && !editMode.productsWillRemove.includes(data._id);

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
            onBlur={actions.removeInput}
            ch={actions.changeProductField}
            makeInput={actions.makeInput}
          />
        </td>
      );
    }

    let rowCName = cnames({
      "active-row": data._id === editMode.id,
      "will-be-removed": editMode.productsWillRemove.includes(data._id)
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
                  onClick={() => actions.removeProduct(data._id)}
                >
                  <i className="fa fa-times"></i>
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
      "edit-mode": view.editMode
    });

    return (
      <div className={containerCName}>
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
                <th className="number-column">№</th>
                <th className="name-column">Назва</th>
                <th>Одиниці вим.</th>
                <th className="cost-column">Ціна</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {(() => {
                if (view.editMode) {
                  return editMode.data.products.map((product, index, origin) =>
                    this.renderProduct(product, index, origin)
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
    let { data, view } = this.props;

    if (view.loading) {
      return <Loader />;
    } else if (view.error) {
      return <p>Fetching Error</p>;
    } else {
      return this.renderContent();
    } 
  }
}

export default Content;


// To edit cell need to add editing className for td and past input into it