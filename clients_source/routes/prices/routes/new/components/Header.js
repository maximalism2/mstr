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
            <button className="button is-primary">
              <i className="fa fa-floppy-o"></i>
              <span>
                Створити
              </span>
            </button>
        </header>
      </div>
    );
  }
}

export default Header;
