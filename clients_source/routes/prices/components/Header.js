import React, { Component, PropTypes} from 'react';

export default class Header extends Component {
  render() {
    return (
      <header className="columns">
        <div className="left-aside column is-3">
          <a href="#" className="button is-primary is-medium ">
          + Створити каталог
          </a>
        </div>
        <div className="center column is-6">
          <input type="text" className="input is-medium" placeholder="Пошук..." />
        </div>
        <div className="right-aside column is-3"></div>
      </header>
    );
  }
}
