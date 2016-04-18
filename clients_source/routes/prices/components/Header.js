import React, { Component, PropTypes} from 'react';
import { Link } from 'react-router';

export default class Header extends Component {
  render() {
    return (
      <header className="columns price-list-header">
        <div className="left-aside column is-3">
          <Link to="/prices/new/" className="button is-primary is-medium">
            + Створити каталог
          </Link>
        </div>
        <div className="center column is-6">
          <input type="text" className="input is-medium" placeholder="Пошук..." />
        </div>
        <div className="right-aside column is-3"></div>
      </header>
    );
  }
}
