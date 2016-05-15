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

class Content extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.refs.fieldInput) {
      console.log('must be focused');
      findDOMNode(this.refs.fieldInput).focus();
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
          <input
            type="text"
            className="input"
            ref="fieldInput"
            defaultValue={data.name}
            onChange={e => actions.changeProductField(data._id, 'name', e.target.value)}
          />
        </td>
      );
    }

    return (
      <tr key={data._id}>
        <td className="number-column">{index + 1}</td>
        {nameCol}
        <td className="unit-column">{data.unitOfMeasurement}</td>
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
          <h1 className="title price-title">{data.name}</h1>
          <div className="sub-main">
            <p className="discount">Знижка: <span className="discount-value">{data.discount + '%'}</span></p>
            <p className="currency">Валюта: <span className="currency-value">UAH (₴)</span></p>
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