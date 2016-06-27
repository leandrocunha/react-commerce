import React from 'react';
import _ from 'lodash';
import Product from './product';
import Sidebar from './sidebar';

export default class Hats extends React.Component {

  render(){

    let products = [
      {
        name: 'Hat A',
        slug: 'hat-a',
        image: 'assets/img/hat-gray.jpg',
        price: '100'
      },
      {
        name: 'Hat B',
        slug: 'hat-b',
        image: 'assets/img/hat-yellow.jpg',
        price: '100'
      },
      {
        name: 'Hat C',
        slug: 'hat-c',
        image: 'assets/img/hat-gray.jpg',
        price: '100'
      },
      {
        name: 'Hat D',
        slug: 'hat-d',
        image: 'assets/img/hat-yellow.jpg',
        price: '100'
      },
      {
        name: 'Hat C',
        slug: 'hat-c',
        image: 'assets/img/hat-gray.jpg',
        price: '100'
      },
      {
        name: 'Hat D',
        slug: 'hat-d',
        image: 'assets/img/hat-yellow.jpg',
        price: '100'
      }
    ];

    return(
    	/* jshint ignore:start */
      <section className="category category-hats" id="Content">
        <header className="header">
          <div className="container">
            <h1 className="title">Hats</h1>
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
