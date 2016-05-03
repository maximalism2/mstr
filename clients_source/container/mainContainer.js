import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class AppContainer extends Component {
  constructor(props, context) {
    super(props);
  }

  componentDidMount() {
    let { children, location } = this.props;
    let isRoot = location.pathname === '/';
    if (!children && isRoot) {
      this.context.router.push('prices/')
    }
  }

  render() {
    let svgLogoStyle = {
      fill: 'none',
      stroke: '#1fc8db',
      strokeWidth: '40'
    }
    return (
      <div className="app">
        <header className="header">
          <div className="container">
            <div className="header-left">
              <Link to="/prices/" className="header-item header-logo">
                <h1 className="logo-title title">Master</h1>
                <svg
                   viewBox="0 0 1500 1500"
                   id="mainIco"
                   className="main-logo"
                   style={{objectFit: 'contain'}}>
                  <path
                     d="m 758.40909,23.238525 c -25.24881,0 -46.37266,17.513981 -51.9375,41.0625 C 609.93152,74.189989 523.10013,111.2979 456.62784,166.45727 c -6.20266,-2.52094 -12.98585,-3.90625 -20.09375,-3.90625 c -29.49182,0 -53.40625,23.91443 -53.40625,53.40625 c 0,8.31961 1.9187,16.19924 5.3125,23.21875 c -41.11491,57.15271 -64.84375,124.52844 -64.84375,196.6875 c 0,6.29908 0.17383,12.55837 0.53125,18.78125 l -0.53125,0 l 0,123.84375 c -28.10129,15.64186 -43.8125,33.05773 -43.8125,51.40625 c 0,67.9194 214.69315,122.96875 479.5,122.96875 c 264.80681,0 479.46871,-55.04935 479.46871,-122.96875 c 0,-18.71678 -16.3349,-36.45627 -45.5,-52.34375 l 0,-122.90625 l -0.5625,0 c 0.3576,-6.22118 0.5625,-12.48357 0.5625,-18.78125 c 0,-71.29406 -23.1968,-137.91572 -63.4062,-194.625 c 4.0599,-7.53114 6.375,-16.12546 6.375,-25.28125 c 0,-29.49182 -23.9145,-53.40625 -53.4063,-53.40625 c -7.7476,0 -15.1053,1.6573 -21.75,4.625 C 994.4832,111.62344 907.30209,74.232543 810.34659,64.301025 c -5.56484,-23.548519 -26.68869,-41.0625 -51.9375,-41.0625 z"
                     id="path4356"
                     style={svgLogoStyle} />
                  <path
                     d="m 296.625,792.15626 l 0,110.09378 l 0.0625,0 l 134.5,131.81256 l 0,0.7812 l 236.78125,0 l 68.46875,-82.87506 l 48.46875,0 L 853.25,1034.6563 l 0,0.1875 l 236.7812,0 l 0,-0.5938 l 134.6563,-131.99996 l 0,-110.09378 l -928.0625,0 z"
                     id="rect4701"
                     style={svgLogoStyle} />
                  <path
                     d="m 324.40625,680 l 0,112.15625 l 869.65625,0 l 0,-111.1875 c -76.6642,41.73842 -242.15042,70.625 -433.96875,70.625 c -193.26072,0 -359.78753,-29.34763 -435.6875,-71.59375 z m 0,249.40625 l 0,80.71875 l 1.4375,0 c -0.38882,6.3026 -0.59375,12.663 -0.59375,19.0625 c 0,11.87 0.71027,23.5736 2.03125,35.0937 l -1.4375,-2.4687 c 0,0 0.29216,37.933 26.625,93.5 c 0.004,0.01 -0.004,0.023 0,0.031 c 6.39434,14.0713 13.84345,27.5841 22.21875,40.4374 c 0.0205,0.032 0.0419,0.062 0.0625,0.094 c 18.67602,34.6483 42.2956,62.9369 66.46875,81.9062 c 0.005,0.01 0.026,-0.01 0.0312,0 c 6.45584,6.4401 13.23763,12.9335 20.4375,19.4376 c 20.89902,19.4705 46.54793,40.8685 75.125,62.2812 c 74.19371,55.5931 142.87785,92.2606 164.21875,88.8125 l 61.09375,0 l 59.96875,0 l 0,-0.4687 c 16.87942,8.3682 89.03352,-29.2211 167.3125,-87.875 c 43.20165,-32.3711 79.71185,-64.7618 103.21875,-90.4063 c 21.2142,-18.6612 41.5833,-44.312 58.0938,-74.9687 c 8.6016,-15.9724 15.5032,-32.0908 20.6874,-47.8126 c 15.1443,-36.2332 23.5,-75.9454 23.5,-117.5937 c 0,-7.6726 -0.2864,-15.2807 -0.8437,-22.8125 l 0,-74.09375 L 1090.0312,1034.25 l 0,0.5938 l -236.7812,0 l 0,-0.1876 l -68.34375,-82.68745 l -48.46875,0 l -68.46875,82.87505 l -236.78125,0 l 0,-0.7813 L 324.40625,929.40625 z"
                     id="path4787"
                     style={svgLogoStyle} />
                </svg>
              </Link>
              <a className="header-tab is-active" href="#">
                Каталоги
              </a>
              <Link to="prices/" className="header-tab">
                Розрахунки
              </Link>
            </div>

            <span className="header-toggle">
              <span></span>
              <span></span>
              <span></span>
            </span>

            <div className="header-right header-menu">
              <a href="" className="header-item">
                <i className="fa fa-cog"></i>
              </a>
            </div>
          </div>
        </header>
        {this.props.children ? this.props.children : 'empty'}
      </div>
    );
  }
}

AppContainer.contextTypes = {
  router: PropTypes.object.isRequired
}

AppContainer.propTypes = {
  children: PropTypes.element
}

function select(state) {
  return {
    routing: state.routing,
    prices: state.prices
  }
}

export default connect(select)(AppContainer);
