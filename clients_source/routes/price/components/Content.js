import React, { Component, PropTypes } from 'react';

class Content extends Component {
  render() {
    console.log('price content props', this.props);
    return (
      <div className="price-content container">
        <div className="main-info content-container">
          <h1 className="title price-title">{this.props.data.name}</h1>
        </div>
        <div className="products-list content-container">
        </div>
      </div>
    );
  }
}

export default Content;
