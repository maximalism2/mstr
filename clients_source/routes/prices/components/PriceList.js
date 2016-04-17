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
        return data.map((item, index) => {
          return (
            <PriceItem
              key={index}
              name={item.name}
              _id={item._id}
              actions={actions}
            />
          );
        });
      }
    }
  }

  render() {
    return (
      <div className="columns">
        <div className="left-aside column is-3">
          <div className="card">
            <br/>
            <br/>
            <br/>
            <br/>
          </div>
        </div>
        <div className="center column is-6">
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
