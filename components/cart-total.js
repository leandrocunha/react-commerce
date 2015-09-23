import React from 'react';
import _ from 'lodash';
import Flux from './../flux/';

export default class CartTotal extends React.Component {

  constructor(props){
    super(props);
    this.state = { total: 0 };
  }

  componentDidMount(){
    
    Flux.store.cart.on('change', () => {
        let cart = Flux.store.cart.get();
        this._getTotal(cart);
      });
  }

  _getTotal(products){
    let totalCart = [];

    _.map(products, (p) => {
        let total = p.quantity * p.price;
        totalCart.push(total);
      });

    this.setState({total: _.sum(totalCart)});
  }

  render(){

    return(
      /* jshint ignore:start */
      <span>{this.state.total}</span>
      /* jshint ignore:end */
    );
  }
}
