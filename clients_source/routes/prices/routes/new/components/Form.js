import React, { Component, PropTypes } from 'react';

class Form extends Component {
  render() {
    return (
      <div className="container new-price-form">
        <h2 className="title centered">Новий каталог</h2>
        <div className="columns content-container">
          <div className="column is-9">
            <span className="label">Назва каталогу</span>
            <input type="text" placeholder="Труби фірми Vaillant..." className="input price-name-input"/>
          </div>
          <div className="column is-3">
            <span className="label">Знижка, %</span>
            <input type="text" placeholder="0" className="input price-discount-input"/>
          </div>
        </div>

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

        <div className="columns is-gapless content-container input-row">
          <div className="column is-7">
            <input type="text" className="input"/>
          </div>
          <div className="column is-3">
            <input type="text" className="input"/>
          </div>
          <div className="column is-2">
            <input type="text" className="input"/>
          </div>
        </div>


      </div>
    );
  }
}

Form.propTypes = {
  data: PropTypes.object.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired
}

export default Form;
