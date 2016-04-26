import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class PriceItem extends Component {
  render() {
    let { actions, _id } = this.props;
    return (
      <div className="price-item">
        <p
          className="title link"
          onClick={() => actions.fetchPriceById(_id)}
        >
        {
          // <Link to={`/`/*`${this.props._id}/`*/}>
        }
          {this.props.name}
        {
          // </Link>
        }
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
  updatedAt: PropTypes.any.isRequired // Date object
}

export default PriceItem;
