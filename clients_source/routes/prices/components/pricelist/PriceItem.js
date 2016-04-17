import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class PriceItem extends Component {
  render() {
    return (
      // <Link to={`/`/*`${this.props._id}/`*/}>
        <div className="card price-item">
          <p
            className="title link"
            onClick={() => this.props.actions.fetchPriceById(this.props._id)}
          >{this.props.name}</p>
        </div>
      // </Link>
    );
  }
}

PriceItem.propTypes = {
  name: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired
}

export default PriceItem;
