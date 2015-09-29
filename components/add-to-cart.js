import React from 'react';
import Cookie from 'react-cookie';
import Flux from './../flux/';

export default class AddToCart extends React.Component {

  _addToCart(e){
    e.preventDefault();

    if(!this.props.size){
      $(React.findDOMNode(this.refs.flashMsg)).html('Select a size!');
    }else{
      let _uat = Cookie.load('_UAT');

      if(_uat){
        let user = Flux.store.user.get();
        let cart = {
              uemail: user.email,
              name: this.props.name,
              size: this.props.size,
              quantity: this.props.quantity,
              price: this.props.price
            };

        Flux.actions.cart.add(cart).
          then(() => this.context.router.transitionTo('my-cart'));
      }else{
        this.context.router.transitionTo('login');
      }
    }

  }

  render(){
    return(
      /* jshint ignore:start */
      <div className="add-to-cart-wrapper">
        <span className="flash-msg" ref="flashMsg"/>
        <a className="btn" href="#" onClick={this._addToCart.bind(this)}>
          <i className="fa fa-shopping-cart"></i> Add to cart
        </a>
      </div>
      /* jshint ignore:end */
    );
  }
}

AddToCart.contextTypes = {
  router: React.PropTypes.any.isRequired
};
