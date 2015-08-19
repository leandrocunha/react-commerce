import React from 'react';
import { Link } from 'react-router';
import Logotype from './logotype.js';
import flux from './../flux/';

export default class Header extends React.Component {

  _logout(e){
    e.preventDefault();
    localStorage.removeItem('isSignedIn');
    flux.store.user.set({});
    this.context.router.transitionTo('app', null, { forceRefresh: true }  );
  }

  render(){

    let logged = localStorage.isSignedIn;

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
                {
                  (logged) &&
                  <li className="item">
                    <Link to="my-cart">
                      My Cart
                    </Link>
                  </li>
                }
                {
                  (logged) &&
                  <li className="item">
                    <Link to="my-account">
                      My Account
                    </Link>
                  </li>
                }
                {
                  (logged) &&
                  <li className="item">
                    <a href="/logout" onClick={this._logout.bind(this)}>
                      Logout
                    </a>
                  </li>
                }
                {
                  (!logged) &&
                  <li className="item login">
                    <Link to="login">
                      Login
                    </Link>
                  </li>
                }
                {
                  (!logged) &&
                  <li className="item login">
                    <Link to="create-account">
                      Create Account
                    </Link>
                  </li>
                }
              </ul>
            </nav>
          </div>
  			</div>
  		</header>
  		/* jshint ignore:end */
    );
  }
}

Header.contextTypes = {
  router: React.PropTypes.any.isRequired
};
