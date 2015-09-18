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
    let cartTotal = _.isEmpty(products) ? 0 : _.sum(_.map(products, 'price'));
    this.setState({total: cartTotal});
  }

  render(){
    // this.setState({total: 0});

    // let total = this._getTotal(this.props.products);
    // console.log(this.props.products);

    return(
      /* jshint ignore:start */
      <span>{this.state.total}</span>
      /* jshint ignore:end */
    );
  }
}
