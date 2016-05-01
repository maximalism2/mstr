import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class PriceItem extends Component {
  render() {
    let { actions, _id } = this.props;
    return (
      <div className="price-item" style={this.props.style}>
        <p
          className="title link"
        >
          <Link to={`/price/${this.props._id}/`} className="link-to-price">
            {this.props.name}
          </Link>
        </p>
        <p className="count">
          {this.props.count} позицій
        </p>
        <div className="updated-at">
          Оновлено: {this.props.updatedAt.toLocaleDateString()}
        </div>
      </div>
    );
  }
}

PriceItem.propTypes = {
  name: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired,
  updatedAt: PropTypes.any.isRequired // Date object
}

export default PriceItem;
