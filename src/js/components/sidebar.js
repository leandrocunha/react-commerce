import React from 'react';

export default class Sidebar extends React.Component {

  render(){

    return(
      /* jshint ignore:start */
      <div className="sidebar">
        <div className="filter-type">
          <p className="title">Colors</p>
          <ul className="filters-list">
            <li className="filter">
              <input type="checkbox"/> Red
            </li>
            <li className="filter">
              <input type="checkbox"/> Green
            </li>
            <li className="filter">
              <input type="checkbox"/> Black
            </li>
            <li className="filter">
              <input type="checkbox"/> Gray
            </li>
          </ul>
        </div>
        <div className="filter-type">
          <p className="title">Sizes</p>
          <ul className="filters-list">
            <li className="filter">
              <input type="checkbox"/> S
            </li>
            <li className="filter">
              <input type="checkbox"/> M
            </li>
            <li className="filter">
              <input type="checkbox"/> L
            </li>
            <li className="filter">
              <input type="checkbox"/> XL
            </li>
            <li className="filter">
              <input type="checkbox"/> XXL
            </li>
          </ul>
        </div>
      </div>
      /* jshint ignore:end */
    );
  }
}
