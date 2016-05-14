import React, { Component, PropTypes } from 'react';
import Loader from '../../../common/components/loader';
import cnames from 'classnames';

class Content extends Component {
  constructor() {
    super();

    this.state = {
      needToMountControls: false
    }

    this.animationTimeout = 300;
  }

  componentWillReceiveProps(nextProps) {
    // We need to check what user want to do.
    // If he want to exit from edit mode, we need to hide edit mode controls
    // and unmount them
    let nextView = nextProps.view;
    let currView = this.props.view;

    if (!nextView.editMode && currView.editMode) { // If will turn off
      setTimeout(() => {
        // We need to unmount controls after short timeout for play the animation
        this.setState({
          needToMountControls: false
        });
      }, this.animationTimeout);
    } else if (nextView.editMode && !currView.editMode) { // If will turn on
      this.setState({
        needToMountControls: nextProps.view.editMode
      });
    }
  }

  renderEditModeControls() {
    let { view, actions } = this.props;

    let editControlsCName = cnames({
      "edit-mode-controls": true,
      "showed": view.editMode
    });

    if (this.state.needToMountControls) { // <= global variable
      return (
        <div className={editControlsCName}>
          <button
            className="button"
            onClick={() => actions.editModeOff()}
          >Скасувати</button>
          {" "}
          <button className="button is-success on-save">
            <span className="icon"><i className="fa fa-save"></i></span>
            Зберегти
          </button>
        </div>
      );
    } else {
      return null;
    }
  }

  renderContent() {
    let { data, view, actions } = this.props;
    let updatedAt = data.updatedAt ? (new Date(data.updatedAt)).toLocaleDateString() : null;

    let containerCName = cnames({
      "price-content": true,
      "container": true,
      "edit-mode": view.editMode
    });

    return (
      <div className={containerCName}>
        {this.renderEditModeControls()}
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
      return <p>Fetching Error</p>;
    } else {
      return this.renderContent();
    } 
  }
}

export default Content;


// To edit cell need to add editing className for td and past input into it