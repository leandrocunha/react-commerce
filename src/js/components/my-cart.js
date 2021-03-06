import React from 'react';
import _ from 'lodash';
import {actions, store} from './../flux/';
import CartTotal from './cart-total';

export default class MyCart extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){

    // let user = Flux.store.user.get();

    // if(user){
    //   Flux.actions.cart.get(user)
    //     .then(() => {
    //       let cart = Flux.store.cart.get();
    //       this.setState({cart: cart});
    //     });
    // }else{
    //   Flux.store.user.on('change', () => {
    //       user = Flux.store.user.get();
    //       Flux.actions.cart.get(user)
    //         .then(() => {
    //             let cart = Flux.store.cart.get();
    //             this.setState({cart: cart});
    //           });
    //     });
    // }

    // Flux.store.cart.on('transactionCode', () => this._sendToPayment());
    
  }

  _updateCart(index, e){

    const newValue = $(e.target).val();
    const cart = this.state.cart.concat(); //esse .concat() clona o array, pq é legal manter as referências imutáveis

    cart[index].quantity = newValue;

    this.setState({cart});
  }

  _removeProducts(e){
    e.preventDefault();

    let user = store.user.get();
    let productId = e.target.parentElement.dataset.productId;
    let data = { pId: productId, uemail: user.email };
    
    actions.cart.remove(data)
      .then(() => {
          let cart = store.cart.get();
          this.setState({cart: cart});
        });
  }

  _checkout(e) {
    e.preventDefault();

    let cart = this.state.cart;

    actions.cart.checkout(cart)
      .catch(e => console.log(e));
  }

  _sendToPayment() {
    let transactionCode = store.cart.getTransactionCode();
    window.location = 'https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code=' + transactionCode.code[0];
  }

  render(){
    const cart = store.cart.get();

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
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {
                  _.map(cart, (p, index) => 
                      <tr key={p._id}>
                        <td>
                          <a data-product-id={p._id} href="#" onClick={this._removeProducts.bind(this)}>
                            <i className="fa fa-times" />
                          </a>
                        </td>
                        <td>{p.name}</td>
                        <td>{p.size}</td>
                        <td>
                          <input min="1"
                                 name="quantity"
                                 onChange={this._updateCart.bind(this, index)}
                                 step="1"
                                 type="number"
                                 value={p.quantity} />
                        </td>
                        <td>{p.price}</td>
                        <td>{p.price * p.quantity}</td>
                      </tr>
                  )
                }
              </tbody>
              <tfooter>
                <tr>
                  <td colSpan="5">Total:</td>
                  <td>
                    <CartTotal products={this.state.cart} />
                  </td>
                </tr>
              </tfooter>
            </table>
            <button className="btn btn-primary" onClick={this._checkout.bind(this)}>
             <i className="fa fa-shopping-cart"></i> checkout
            </button>
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
