import React from 'react';
import _ from 'lodash';
import Flux from './../flux/';

export default class MyCart extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    this.setState( JSON.parse(localStorage.cart));
    this.forceUpdate();
  }

  render(){
    
    return(
      /* jshint ignore:start */
      <section className="my-cart" id="Content">
        <header className="header">
          <div className="container">
            <h1 className="title">My Cart</h1>
          </div>
        </header>
        <div className="page-content">
          <div className="container">
            {
              (!$.isEmptyObject(this.state))
              ?
                _.map(this.state,
                  (p, index) => 
                  <li key={index}>{p.name} - {p.price}</li>
                )
              :
                <p>Your cart is empty!</p>
            }
          </div>
        </div>
      </section>
      /* jshint ignore:end */
    );
  }
}

MyCart.contextTypes = {
  router: React.PropTypes.any.isRequired
};
