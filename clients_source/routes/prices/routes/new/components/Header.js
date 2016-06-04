import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cnames from 'classnames';

class Header extends Component {
  render() {
    let { data, actions } = this.props;

    let dataIsNotPulled = !data.name.length || !data.products.length;

    if (data.products.length === 1) {
      dataIsNotPulled = data.products[0].name === '';
      dataIsNotPulled = data.products[0].unitOfMeasurement === '';
      dataIsNotPulled = data.products[0].cost === '' || 0;
    }

    let createButtonCNames = cnames({
      "button is-success is-pulled-right": true,
      "is-disabled": dataIsNotPulled
    });

    let hint = dataIsNotPulled ? 'Потрібно вказати назву та створити декілька елементів' : '';

    return (
      <div className="header-wrapper">
        <header className="price-list-header new-header">
          <Link to="/prices/" className="button is-link icon-link">
            <i className="fa fa-arrow-left"></i>
          </Link>
          <button
            className={createButtonCNames}
            onClick={() => actions.createPrice()}
            title={hint}
          >
            <span className="icon">
              <i className="fa fa-floppy-o"></i>
            </span>
            <span>
              Створити
            </span>
          </button>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  data: PropTypes.object.isRequired,
  view: PropTypes.object.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired
}

export default Header;
