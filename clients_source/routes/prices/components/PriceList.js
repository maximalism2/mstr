import React, { Component, PropTypes } from 'react';
import PriceItem from './pricelist/PriceItem';

class PriceList extends Component {
  renderList() {
    let { data, view, actions } = this.props;
    if (view.error) {
      return (
        <p className="title size-4">
          Виникли технічні проблеми...
          <br />
          будь ласка, спробуйте пізніше
        </p>
      );
    } else {
      if (data) {
        return (
          <div className="container price-list-content">
            {data.map((item, index) => {
              console.log('item', item.products.length, item.products, item);
              return (
                <PriceItem
                  key={index}
                  name={item.name}
                  _id={item._id}
                  count={item.products.length}
                  updatedAt={new Date(item.updatedAt)}
                  actions={actions}
                />
              );
            })}
          </div>
        )
      }
    }
  }

  render() {
    return (
      <div className="columns">
        <div className="center column is-8 is-offset-2">
          {this.renderList()}
        </div>
      </div>
    );
  }
}

PriceList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  view: PropTypes.object.isRequired,
  // actions: PropTypes.object.isRequired
}

export default PriceList;
