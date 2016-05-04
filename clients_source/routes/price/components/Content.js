import React, { Component, PropTypes } from 'react';
import Loader from '../../../common/components/loader';
import cnames from 'classnames';

class Content extends Component {
  renderContent() {
    let { data, view } = this.props;
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
              {data.products.map((product, index) => {
                return (
                  <tr key={index}>
                    <td className="number-column">{index + 1}</td>
                    <td className="name-column">{product.name}</td>
                    <td className="unit-column">{product.unitOfMeasurement}</td>
                    <td className="cost-column">{product.cost}</td>
                  </tr>
                );
              })}
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
      return this.renderError();
    } else {
      return this.renderContent();
    } 
  }
}

export default Content;


// To edit cell need to add editing className for td and past input into it