import React from 'react';
import { Link } from 'react-router';
import Logotype from './logotype.js';
import flux from './../flux/';

export default class Header extends React.Component {

  render(){

    let user = flux.store.user.get();

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
                { user ? <li className="item"><Link to='my-account'>My Account</Link></li> : <li className="item login"><Link to='login'>Login</Link></li> }
              </ul>
            </nav>
          </div>
  			</div>
  		</header>
  		/* jshint ignore:end */
    );
  }
}
