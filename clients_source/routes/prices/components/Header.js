import React, { Component, PropTypes} from 'react';
import { Link } from 'react-router';

export default class Header extends Component {
  render() {
    return (
      <div className="header-wrapper">
        <header className="columns price-list-header">
          <div className="left-aside column is-3">
            <Link to="/prices/new/" className="button is-primary create-new-button">
            <i className="fa fa-plus-circle"></i>
            Створити каталог
            </Link>
          </div>
          <div className="center column is-6">
            <div className="control has-icon has-icon-right">
              <input type="text" className="input is-medium" placeholder="Пошук..." />
              <i className="fa fa-search search-input-icon"></i>
            </div>
          </div>
          <div className="right-aside column is-3"></div>
        </header>
      </div>
    );
  }
}
