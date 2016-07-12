import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class SignUpContainer extends Component {
  render() {
    return (
      <div className="register-page">
        <h2 className="motivation-to-register">
          Долучайтесь до команди професійних<br />
          майстрів з усієї країни на <span className="site-name">mstr</span>
        </h2>
        <div className="registration-form-box">
          <h3 className="choose-title">Зареєструйтесь</h3>
          <div className="as-customer">
            <p className="part-title">як <strong>майстер</strong></p>
            <p className="choose-desc">
              Спростіть до неможливого процес закупівлі матеріалів
              для своїх об’єктів та отримайте можливіть завжди бути на зв’язку
              з улюбленою компанією!
            </p>
            <a className="button is-primary as-customer-button">Стати майстром</a>
          </div>
          <svg width="5" height="300" className="divider">
           <defs>
             <linearGradient id="linear" x1="0%" y1="0%" x2="0%" y2="100%">
               <stop offset="0%"  stopColor="#1fc8db"/>
               <stop offset="100%" stopColor="#24e6ac"/>
             </linearGradient>
           </defs>

           <rect width="1" height="300" stroke="url(#linear)" strokeWidth="2" />
          </svg>
          <div className="as-company">
            <p className="part-title">як <strong>компанія</strong></p>
            <p className="choose-desc">
              Отримайте тисячі нових потенційних клієнтів та інтеграцію з
              найпопулярнішими системами бухгалтерського обліку в декілька
              кліків!
            </p>
            <a className="button is-success as-company-button">Створити компанію</a>
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