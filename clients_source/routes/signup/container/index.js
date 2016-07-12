import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import * as actions from '../actions';

class SignUpContainer extends Component {
  constructor(...args) {
    super(...args);
  }

  componentDidMount() {
    this.props.history.listen(() => {
      let { location } = this.props;
      this.props.dispatch(actions.locationWillChange({
        pathname: location.pathname,
        query: location.query,
        search: location.search
      }));
    });
  }

  componentWillReceiveProps(nextProps) {
    let currProps = this.props;
    if (currProps.location.pathname !== nextProps.location.pathname) {
      // If location is changed
      switch (nextProps.location.pathname) {
        case '/registration/as-master/': {
          setTimeout(() => this.props.dispatch(actions.chooseSide('customer')), 500);
          break;
        }
        case '/registration/as-company/': {
          setTimeout(() => this.props.dispatch(actions.chooseSide('company')), 500);
          break;
        }
        default: {
          setTimeout(() => this.props.dispatch(actions.resetChoose()), 500);
        }
      }
    }
  }

  renderCompanyDesc() {
    let { registration } = this.props;
    console.log('registration_2', registration)
    if (registration.side === 'customer') {
      return (
        <div className="as-company">
          {this.props.children}
        </div>
      );
    } else if (/^\/registration\/as\-master(\/|)$/.test(this.props.location.pathname)) {
      return null;
    } else {
      return (
        <div className="as-company">
          <p className="in-development-title">Розділ у розробці</p>
          <p className="part-title in-development">як <strong>компанія</strong></p>
          <p className="choose-desc in-development">
            Отримайте тисячі нових потенційних клієнтів та інтеграцію з
            найпопулярнішими системами бухгалтерського обліку в декілька
            кліків!
          </p>
          {registration.side !== 'company' &&
            <Link
              to="/registration/as-company/"
              className="button is-success as-company-button is-disabled"
            >
              Створити компанію
            </Link>
          }
        </div>
      );
    }
  }

  componentWillMount() {
    let { pathname } = this.props.location;
    console.log('pathname', pathname);
    if (/^\/registration\/as\-company(\/|)$/.test(pathname)) {
      this.props.dispatch(actions.chooseSide('company'));
    } else if (/^\/registration\/as\-master(\/|)$/.test(pathname)) {
      this.props.dispatch(actions.chooseSide('customer'));
    }
  }

  renderCustomerDesc() {
    let { registration } = this.props;
    console.log('registration', registration)
    if (registration.side === 'company') {
      return (
        <div className="as-customer">
          {/*this.props.children*/}
          children
        </div>
      );
    } else if (/^\/registration\/as\-company(\/|)$/.test(this.props.location.pathname)) {
      return null;
    } else /*if (/^\/registration\/$/.test(registration.location.pathname))*/ {
      return (
        <div className="as-customer">
          <p className="part-title">як <strong>майстер</strong></p>
          <p className="choose-desc">
            Спростіть до неможливого процес закупівлі матеріалів
            для своїх об’єктів та отримайте можливіть завжди бути на зв’язку
            з улюбленою компанією!
          </p>
          {registration.side !== 'customer' &&
            <Link
              to="/registration/as-master/"
              className="button is-primary as-customer-button"
            >
              Стати майстром
            </Link>
          }
        </div>
      );
    }
  }

  render() {
    let companyTransitionProps = {
      transitionName: "company",
      transitionEnterTimeout: 500,
      transitionLeaveTimeout: 500
    }

    let customerTransitionProps = {
      transitionName: "customer",
      transitionEnterTimeout: 500,
      transitionLeaveTimeout: 500
    }

    return (
      <div className="register-page">
        <h2 className="motivation-to-register">
          Долучайтесь до команди професійних<br />
          майстрів з усієї країни на <span className="site-name">mstr</span>
        </h2>
        <div className="registration-form-box">
          <h3 className="choose-title">Зареєструйтесь</h3>
          <div className="part-wrapper">
            <ReactCSSTransitionGroup {...customerTransitionProps}>
              {this.renderCustomerDesc()}
            </ReactCSSTransitionGroup>
            <svg width="2" height="300" className="divider">
             <defs>
               <linearGradient id="linear" x1="0%" y1="0%" x2="0%" y2="100%">
                 <stop offset="0%"  stopColor="#1fc8db"/>
                 <stop offset="100%" stopColor="#24e6ac"/>
               </linearGradient>
             </defs>

             <rect width="1" height="300" stroke="url(#linear)" strokeWidth="2" />
            </svg>
            <ReactCSSTransitionGroup {...companyTransitionProps}>
              {this.renderCompanyDesc()}
            </ReactCSSTransitionGroup>
          </div>
        </div>
      </div>
    );
  }
}

function select(state) {
  return {
    registration: state.registration,
  }
}

export default connect(select)(SignUpContainer);