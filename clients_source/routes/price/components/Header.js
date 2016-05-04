import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router';
import cnames from 'classnames';

class Header extends Component {
  renderRemoveModal() {
    let { actions, view } = this.props;

    let cancelButtonCName = cnames({
      "button": true,
      "is-disabled": view.removingLoading
    });

    let actionButtonCName = cnames({
      "button is-danger": true,
      "is-loading": view.removingLoading
    });

    return (
        <div className="will-remove-modal">
          <div className="modal-box">

            <div className="question">
              <p>Ви дійсно бажаєте видалити цей каталог?</p>
              <p className="sub-mess">Дані каталогу будуть втрачені.</p>
            </div>

            <div className="controls">
              
              <button
                className={cancelButtonCName}
                onClick={() => actions.willRemove(false)}
              >
                Скасувати
              </button>
              
              {" "}
              
              <button
                className={actionButtonCName}
                onClick={() => actions.remove()}
              >
                Видалити
              </button>
            </div>

          </div>
          <div className="overlay" onClick={() => actions.willRemove(false)}></div>
        </div>
    );
  }

  render() {
    let { actions, view } = this.props;

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
              onClick={() => actions.willRemove(true)}
            >
              <span className="icon">
                <span className="fa fa-times"></span>
              </span>
              <span>Видалити</span>
            </button>
          </div>
        </header>
        <ReactCSSTransitionGroup
          component="div"
          transitionName="modal"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          {view.willRemove && this.renderRemoveModal()}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

Header.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  view: PropTypes.object.isRequired
}

export default Header;
