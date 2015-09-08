import React from 'react';
import _ from 'lodash';
import Flux from './../flux/';

export default class MyCart extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){

    let user = Flux.store.user.get();

    if(user){
      Flux.actions.cart.get(user)
        .then( () => {
          let cart = Flux.store.cart.get();
        });

    }else{
      Flux.store.user.on('change', () => {
        user = Flux.store.user.get();
        
        Flux.actions.cart.get(user)
          .then( () => {
            let cart = Flux.store.cart.get();
          });
      });
    }
    // let user = Flux.store.user.get();
    // Flux.actions.cart.get(user);
    // this.forceUpdate();
    
  }

  _removeFromCart(e){
    e.preventDefault();

    let logged = localStorage.isSignedIn;

    if(logged){
      let me = $(e.target).hasClass('fa') ? $(e.target).parents('a') : $(e.target);
      let product = me.data('product');
      let cart = localStorage.getItem('cart');
    }

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
            <table className="cart-table" width="100%">
              <thead>
                <tr>
                  <th />
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {
                  (!$.isEmptyObject(this.state))
                  ?
                    _.map(this.state,
                      (p, index) => 
                        <tr key={p.index}>
                          <td>
                            <a href="#" data-product={p.name} onClick={this._removeFromCart.bind(this)}>
                              <i className="fa fa-times" />
                            </a>
                          </td>
                          <td>{p.name}</td>
                          <td><input type="number" name="quantity" step="1"/></td>
                          <td>{p.price}</td>
                        </tr>
                    )
                  :
                    <tr><td colSpan="4">Your cart is empty!</td></tr>
                }
              </tbody>
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
