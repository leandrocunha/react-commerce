import React from 'react';
import _ from 'lodash';
import Product from './product';
import Sidebar from './sidebar';

export default class Tshirts extends React.Component {

  render(){

    let products = [
      {
        name: 'T-Shirt A',
        slug: 't-shirt-a',
        image: 'assets/img/tshirt-blue.jpg',
        price: '100'
      },
      {
        name: 'T-Shirt B',
        slug: 't-shirt-b',
        image: 'assets/img/tshirt-red.jpg',
        price: '100'
      },
      {
        name: 'T-Shirt C',
        slug: 't-shirt-c',
        image: 'assets/img/tshirt-blue.jpg',
        price: '100'
      },
      {
        name: 'T-Shirt D',
        slug: 't-shirt-d',
        image: 'assets/img/tshirt-red.jpg',
        price: '100'
      },
      {
        name: 'T-Shirt C',
        slug: 't-shirt-c',
        image: 'assets/img/tshirt-blue.jpg',
        price: '100'
      },
      {
        name: 'T-Shirt D',
        slug: 't-shirt-d',
        image: 'assets/img/tshirt-red.jpg',
        price: '100'
      }
    ];

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
                    _.map(products,
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
