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

        <table className="table content-container">
          <thead>
            <tr>
              <th>Name</th>
              <th>Instrument</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Misty Abbott</td>
              <td>Bass Guitar</td>
              <td className="is-link is-icon">
                <a href="#">
                  <i className="fa fa-twitter"></i>
                </a>
              </td>
              <td className="is-link is-icon">
                <a href="#">
                  <i className="fa fa-instagram"></i>
                </a>
              </td>
            </tr>
            <tr>
              <td>John Smith</td>
              <td>Rhythm Guitar</td>
              <td className="is-link is-icon">
                <a href="#">
                  <i className="fa fa-twitter"></i>
                </a>
              </td>
              <td className="is-link is-icon">
                <a href="#">
                  <i className="fa fa-instagram"></i>
                </a>
              </td>
            </tr>
            <tr>
              <td>Robert Mikels</td>
              <td>Lead Guitar</td>
              <td className="is-link is-icon">
                <a href="#">
                  <i className="fa fa-twitter"></i>
                </a>
              </td>
              <td className="is-link is-icon">
                <a href="#">
                  <i className="fa fa-instagram"></i>
                </a>
              </td>
            </tr>
            <tr>
              <td>Karyn Holmberg</td>
              <td>Drums</td>
              <td className="is-link is-icon">
                <a href="#">
                  <i className="fa fa-twitter"></i>
                </a>
              </td>
              <td className="is-link is-icon">
                <a href="#">
                  <i className="fa fa-instagram"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    );
  }
}

export default Content;
