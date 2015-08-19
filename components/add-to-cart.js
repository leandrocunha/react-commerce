import React from 'react';
import Flux from './../flux/';

export default class AddToCart extends React.Component {

  _addToCart(e){
    e.preventDefault();

    let logged = localStorage.isSignedIn;

    if(logged){
      let cart = {
          product: {
            name: this.props.name,
            price: this.props.price
          }
        };

      localStorage.setItem('cart', JSON.stringify(cart));
      Flux.actions.cart.add(cart);

      this.context.router.transitionTo('my-cart');
    }else{
      this.context.router.transitionTo('login');
    }

  }

  render(){
    return(
      /* jshint ignore:start */
      <a className="btn" href="#" onClick={this._addToCart.bind(this)}>
          <i className="fa fa-shopping-cart"></i> Add to cart
      </a>
      /* jshint ignore:end */
    );
  }
}

AddToCart.contextTypes = {
  router: React.PropTypes.any.isRequired
};
