import React, { Component, PropTypes } from 'react';
import PriceItem from './pricelist/PriceItem';

class PriceList extends Component {
  constructor(props, context) {
    super();
    this.state = {
      mounted: false
    };
  }

  componentWillMount() {
    this.props.actions.fetchPrices();
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        mounted: true
      });
    }, 100);
  }

  renderList() {
    let { data, view, actions } = this.props;

    let className = "container price-list-content";
    if (this.state.mounted) {
      className += " showed";
    }

    if (view.error) {
      return (
        <p className="title size-4 empty-title">
          Виникли технічні проблеми...
          <br />
          будь ласка, спробуйте пізніше
        </p>
      );
    } else {
      if (data.length) {
        return (
          <div className={className}>
            {data.map((item, index) => {
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
      } else {
        return (
          <p className="title size-4 empty-title">Ще не створено жодного каталогу</p>
        );
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
