import React from 'react';
import _ from 'lodash';
import Flux from './../flux/';

export default class CartTotal extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  _getTotal(products){
    let totalCart = [];
    let total;

    _.map(products, (p) => {
        let total = p.quantity * p.price;
        totalCart.push(total);
      });

    total = _.sum(totalCart);

    this.setState({total: total});
  }

  componentDidMount() {
    this.setState({total: 0});
  }

  componentWillReceiveProps(nextProps){    
    this._getTotal(nextProps.products);
  }

  render(){

    return(
        /* jshint ignore:start */
        <span>
          {this.state.total}
        </span>
        /* jshint ignore:end */
      );
  }
}
