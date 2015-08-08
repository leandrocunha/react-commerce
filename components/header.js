import React from 'react';
import { Link } from 'react-router';
import Logotype from './logotype.js';
import flux from './../flux/';

export default class Header extends React.Component {

  _logout(e){
    e.preventDefault();
    localStorage.removeItem('isSignedIn');
    flux.store.user.set({});
    this.context.router.transitionTo('app');
  }

  render(){

    let ls = localStorage['isSignedIn'];
    let user;

    if(ls){
      flux.store.user.set({
        success: true,
        user: {
            __v: 0,
            _id: "55be60534600aa610687ec5e",
            email: "leandroscunha@gmail.com",
            gender: 2,
            name: "Leandro Cunha",
            password: "$2a$10$4WzEbwyHQisMpjAVP4brPO5YPeY435YRP98iUz.sQsz69xEYasaCe"
          }
       });

      user = flux.store.user.get();
    }

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
                  (user) &&
                  <li className="item">
                    <Link to="my-account">
                      My Account
                    </Link>
                  </li>
                }
                {
                  (user) &&
                  <li className="item">
                    <a href="/logout" onClick={this._logout.bind(this)}>
                      Logout
                    </a>
                  </li>
                }
                {
                  (!user) &&
                  <li className="item login">
                    <Link to="login">
                      Login
                    </Link>
                  </li>
                }
                {
                  (!user) &&
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
