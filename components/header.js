import React from 'react';
import { Link } from 'react-router';
import Logotype from './logotype.js';
import Flux from './../flux/';
import Cookie from 'react-cookie';

export default class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){

    // try load cookie always on refresh
    let _uat = Cookie.load('_UAT');

    // if cookie exists, setStore
    _uat && this.setState({ uat: _uat });

    // when login, change store and update state
    Flux.store.user.on('change', () => {

        // need loading cookie again,
        // because before this not exists
        let _uat = Cookie.load('_UAT');

        this.setState({ uat: _uat });
      });

    console.log(_uat);
  }

  _logout(e){
    e.preventDefault();
    Cookie.remove('_UAT');
    this.state = {};
    this.forceUpdate();
    this.context.router.transitionTo('app');
  }

  render(){

    let cart = (Flux.store.cart.get()) ? Flux.store.cart.get() : 0;

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
                  (this.state.uat) &&
                  <li className="item">
                    <Link to="my-cart">
                      My Cart ({cart})
                    </Link>
                  </li>
                }
                {
                  (this.state.uat) &&
                  <li className="item">
                    <Link to="my-account">
                      My Account
                    </Link>
                  </li>
                }
                {
                  (this.state.uat) &&
                  <li className="item">
                    <a href="/logout" onClick={this._logout.bind(this)}>
                      Logout
                    </a>
                  </li>
                }
                {
                  (!this.state.uat) &&
                  <li className="item login">
                    <Link to="login">
                      Login
                    </Link>
                  </li>
                }
                {
                  (!this.state.uat) &&
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
