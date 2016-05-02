import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class Header extends Component {
  render() {
    return (
      <div className="header-wrapper">
        <header className="price-list-header new-header">
          <Link to="/prices/" className="button is-link icon-link">
            <i className="fa fa-arrow-left"></i>
          </Link>
          <div className="right-side">
            <a className="button is-warning is-outlined">
              <span className="icon">
                <span className="fa fa-edit"></span>
              </span>
              <span>Редагувати</span>
            </a>
            {" "}
            <a className="button is-danger is-outlined">
              <span className="icon">
                <span className="fa fa-times"></span>
              </span>
              <span>Видалити</span>
            </a>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
