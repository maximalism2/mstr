import React, { Component, PropTypes } from 'react';
import { TransitionMotion, spring } from 'react-motion';

class Loader extends Component {
  willLeave() {
    return {
      opacity: spring(0)
    };
  }

  getStyles() {
    return {
      key: 'main-loader',
      style: {
        opacity: 1
      }
    }
  }

  render() {
    return (
      <TransitionMotion
        willLeave={this.willLeave}
        styles={this.getStyles}
      >
        {interpolatedStyle => (
          <div
            className="spinner"
            style={{
              opacity: interpolatedStyle.style.opacity
            }}
          ></div>
        )}
      </TransitionMotion>
    );
  }
}

Loader.propTypes = {
  showed: PropTypes.bool.isRequired
}

export default Loader
