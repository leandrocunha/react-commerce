import React from 'react';
import _ from 'lodash';
import Flux from './../../flux';
import Product from './../product';

export default class ProductsList extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount() {

    Flux.actions.product.get();
    Flux.store.product.on('change', () => {
      let products = Flux.store.product.get();
      this.setState({products: products});
    });
  } 
  
  render() {

    return(
        <div className="products-list">
          {
            _.map(this.state.products,
              (p, index) => 
              <Product key={index} name={p.name} slug={p.slug} image={p.image} price={p.price}/>
            )
          }
        </div>
      );
  } 
}
