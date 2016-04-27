import React, { Component, PropTypes } from 'react';

class Form extends Component {
  renderProducts() {
    let { view, data, actions } = this.props
    let { products } = data;
    return (
      <div>
        <h3 className="title size-3 product-form-title">Товари</h3>
        <div className="columns is-gapless content-container input-row labels-row">
          <div className="column is-7">
            <span className="label">Назва</span>
          </div>
          <div className="column is-3">
            <span className="label">Одиниці вим.</span>
          </div>
          <div className="column is-2">
            <span className="label">Ціна</span>
          </div>
        </div>

        {(() => {
          return products.map((row, key) => {
          if (key === view.inputIndex) {
            // If it is the such row which we need to make input
            return (
              <div
                className="columns is-gapless content-container input-row"
                key={key}
              >
                <div className="column is-7">
                  <input
                    type="text"
                    className="input"
                    defaultValue={row.name}
                  />
                </div>
                <div className="column is-3">
                  <input
                    type="text"
                    className="input"
                    defaultValue={row.unitOfMeasurement}
                  />
                </div>
                <div className="column is-2">
                  <input
                    type="text"
                    className="input"
                    defaultValue={row.cost}
                  />
                </div>
              </div>
            );
          } else {
            // If it is a simple product's row
            return (
              <div
                className="columns is-gapless content-container input-row"
                key={key}
                onClick={() => actions.makeInput(key)}
              >
                <div className="column is-7">
                  <p>{row.name}</p>
                </div>
                <div className="column is-3">
                  <p>{row.unitOfMeasurement}</p>
                </div>
                <div className="column is-2">
                  <p>{row.cost}</p>
                </div>
              </div>
            );
          }
          });
        })()}
      </div>
    );
  }

  render() {
    let { data, view, actions } = this.props;
    let { products } = data;
    return (
      <div className="container new-price-form">
        <h2 className="title centered">Новий каталог</h2>
        <div className="columns content-container">
          <div className="column is-9">
            <span className="label">Назва каталогу</span>
            <input
              type="text"
              placeholder="Труби фірми Vaillant..."
              className="input price-name-input"
              onChange={e => actions.changeField({ name: e.target.value })}
            />
          </div>
          <div className="column is-3">
            <span className="label">Знижка, %</span>
            <input
              type="text"
              placeholder="0"
              className="input price-discount-input"
              onChange={e => actions.changeField({ discount: e.target.value })}
            />
          </div>
        </div>
        {this.renderProducts()}
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
