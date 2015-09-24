import React from 'react';
import _ from 'lodash';
import {InputField} from 'react-serial-forms';
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
            .then(() => {
                // console.log( Flux.store.cart.get() )
                let cart = Flux.store.cart.get();
                this.setState({products: cart});
                this.forceUpdate();
              });
        });
    }
    
  }

  _updateCart(i, e){
    // e.preventDefault();
    
    // let quantity = $(e.target).val();
    // this.setState({
    //     products: 
    //     [i]:
    //       {
    //         quantity: $(e.target).val()
    //       }
    //   })
    // console.log(i);
    // console.log(e);

    const products = this.state.products.concat(); //esse .concat() clona o array, pq é legal manter as referências imutáveis

    products[i].quantity++;

    this.setState({products, updated: true});

  }

  _updateTotal(e){
    e.preventDefault();
    _.map(this.state.products, (p, index) => {
        Flux.actions.cart.add(p);
      });
  }

  render(){

    let cart = Flux.store.cart.get();
    console.log(this.state);

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
                          <td>
                            <input min="1"
                                   name="quantity"
                                   onChange={this._updateCart.bind(this, index)}
                                   step="1"
                                   type="number"
                                   value={this.state.products[index].quantity} />
                          </td>
                          <td>{p.price}</td>
                          <td>{ (this.state.products[index].quantity * p.price) }</td>
                        </tr>
                    )
                }
              </tbody>
              <tfooter>
                <tr>
                  <td colSpan="4">Total:</td>
                  <td>
                    {
                      this.state.updated
                        ? <button onClick={this._updateTotal.bind(this)}>Atualizar total</button>
                        : <button disabled>Atualizar total</button>
                    }
                    
                  </td>
                  <td>
                    <CartTotal products={this.state} />
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
