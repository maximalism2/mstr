import React, { Component, PropTypes } from 'react';
import PriceItem from './pricelist/PriceItem';

class PriceList extends Component {
  constructor(props, context) {
    super();
    this.state = {
      loaded: false
    };
  }

  componentWillMount() {
    let needToShowLoader = this.props.data.length === 0;
    this.props.actions.fetchPrices(needToShowLoader);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.length) {
      setTimeout(() => {
        this.setState({
          loaded: true
        });
      }, 50);
    }
  }

  renderList() {
    let { data, view, actions } = this.props;

    let className = "container price-list-content";
    if (this.state.loaded) {
      className += " showed";
    }

    if (view.error) {
      return (
        <p className="title size-5 empty-title">
          Вибачте, у нас виникли технічні проблеми...
          <br />
          Будь ласка, спробуйте ще раз пізніше
        </p>
      );
    } else if (view.loading) {
      return (
        <div className="spinner"></div>
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
                  style={{
                    transitionDelay: `${0.05 * index}s`
                  }}
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
          <p className="title size-4 empty-title">
            Ще не створено жодного каталогу
          </p>
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
  actions: PropTypes.object.isRequired
}

export default PriceList;
