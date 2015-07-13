import React from 'react';
import { Link } from 'react-router';
import Logotype from './logotype.js';

export default class Header extends React.Component {

  render(){

    return (
    	/* jshint ignore:start */
      <header>
  			<div className="container">
          <div className="row">
    				<Logotype />

            <nav className="nav-bar">
              <ul className="nav-list">
                <li className="item">
                  <Link to="/">Home</Link>
                </li>
                <li className="item">
                  <Link to='tshirts'>
                    T-Shirts
                  </Link>
                </li>
                <li className="item">
                  <Link to='hats'>
                    Hats
                  </Link>
                </li>
                <li className="item">
                  <Link to='contact'>
                    Contact Us
                  </Link>
                </li>
                <li className="item login"><a href="#">Login</a></li>
              </ul>
            </nav>
          </div>
  			</div>
  		</header>
  		/* jshint ignore:end */
    );
  }
}
