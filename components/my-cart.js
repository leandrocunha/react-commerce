import React from 'react';
import _ from 'lodash';
import Flux from './../flux/';
import CartTotal from './cart-total';

export default class MyCart extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){

    let user = Flux.store.user.get();

    if(user){
      Flux.actions.cart.get(user)
        .then(() => this.forceUpdate());
    }else{
      Flux.store.user.on('change', () => {
          user = Flux.store.user.get();
    
          Flux.actions.cart.get(user)
            .then(() => this.forceUpdate());
        });
    }
    
  }

  render(){

    let cart = Flux.store.cart.get();

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
            <table className="cart-table" width="100%">
              <thead>
                <tr>
                  <th />
                  <th>Product</th>
                  <th>Size</th>
                  <th>Qnt</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {
                  (_.isEmpty(cart))
                  ?
                    <tr><td colSpan="4">Your cart is empty!</td></tr>
                  :
                    _.map(cart,
                      (p, index) => 
                        <tr key={p._id}>
                          <td>
                            <a href="#" data-product={p.name}>
                              <i className="fa fa-times" />
                            </a>
                          </td>
                          <td>{p.name}</td>
                          <td>{p.size}</td>
                          <td>{p.quantity}</td>
                          <td>{p.price}</td>
                        </tr>
                    )
                }
              </tbody>
              <tfooter>
                <tr>
                  <td colSpan="4">Total:</td>
                  <td>
                    <CartTotal products={cart} />
                  </td>
                </tr>
              </tfooter>
            </table>
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
