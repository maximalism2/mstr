import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class Header extends Component {
  render() {
    let { actions } = this.props;
    console.log('actions', actions);

    return (
      <div className="header-wrapper">
        <header className="price-list-header new-header">
          <Link to="/prices/" className="button is-link icon-link">
            <i className="fa fa-arrow-left"></i>
          </Link>
          <div className="right-side">
            <button
              className="button is-warning is-outlined"
              onClick={() => actions.editModeOn()}
            >
              <span className="icon">
                <span className="fa fa-edit"></span>
              </span>
              <span>Редагувати</span>
            </button>
            {" "}
            <button
              className="button is-danger is-outlined"
              onClick={() => actions.remove()}
            >
              <span className="icon">
                <span className="fa fa-times"></span>
              </span>
              <span>Видалити</span>
            </button>
          </div>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired
}

export default Header;
