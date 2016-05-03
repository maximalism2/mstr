import React, { Component, PropTypes } from 'react';

class Content extends Component {
  render() {
    let { data } = this.props;
    return (
      <div className="price-content container">
        <div className="main-info content-container">
          <h1 className="title price-title">{data.name}</h1>
        </div>
        <div className="products-list content-container">
        </div>

        <table className="table content-container">
          <thead>
            <tr>
              <th>Назва</th>
              <th>Одиниці вимірювання</th>
              <th>Ціна</th>
            </tr>
          </thead>
          <tbody>
            {data.products.map((product, index) => {
              return (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.unitOfMeasurement}</td>
                  <td>{product.cost}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Content;
