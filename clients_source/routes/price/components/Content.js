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
          onChange={e => ch(data._id, type, e.target.value)}
        />
      );
    }
  }
}

Input.propTypes = {
  data: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  isMainField: PropTypes.bool,
  ch: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired
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

  renderProduct(data, index) {
    let { view, editMode, actions } = this.props;
    // console.log(this.props);

    let nameCol = (
      <td
        className="name-column"
        onClick={() => view.editMode ? actions.makeInput(data._id, 'name') : null}
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
            onBlur={actions.removeInput}
            ch={actions.changeProductField}
          />
        </td>
      );
    }

    let unitCol = (
      <td
        className="unit-column"
        onClick={() => view.editMode ? actions.makeInput(data._id, 'unitOfMeasurement') : null}
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
            onBlur={actions.removeInput}
            ch={actions.changeProductField}
          />
        </td>
      );
    }

    return (
      <tr key={data._id}>
        <td className="number-column">{index + 1}</td>
        {nameCol}
        {unitCol}
        <td className="cost-column">{data.cost}</td>
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
              Валюта: 
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
                  return editMode.data.products.map((product, index) =>
                    this.renderProduct(product, index)
                  );
                } else {
                  return data.products.map((product, index) =>
                    this.renderProduct(product, index)
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