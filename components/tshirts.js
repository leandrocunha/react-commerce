import React from 'react';
import _ from 'lodash';
import Flux from './../flux';
import Product from './product';
import Sidebar from './sidebar';

export default class Tshirts extends React.Component {

  componentDidMount(){
    Flux.actions.product.get();
    Flux.store.product.on('change', () => this.forceUpdate());
  }

  render(){
    
    let products = Flux.store.product.get();
    console.log(products);

    return(
    	/* jshint ignore:start */
      <section className="category category-tshirts" id="Content">
        <header className="header">
          <div className="container">
            <h1 className="title">T-shirts</h1>
          </div>
        </header>
        <div className="page-content">
          <div className="container">
            <div className="row">
              <Sidebar />
              <div className="main-column">
                <div className="products-list">
                  {
                    _.map(this.products,
                      (p, index) => 
                      <Product key={index} name={p.name} slug={p.slug} image={p.image} price={p.price}/>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      /* jshint ignore:end */
    );
  }
}
