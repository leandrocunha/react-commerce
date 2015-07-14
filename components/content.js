import React from 'react';
import _ from 'lodash';
import FeaturedCarousel from './featured-carousel';
import Product from './product';

export default class Content extends React.Component {

  render(){

    let featured_products = [
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
      }
    ];

    return (
      /* jshint ignore:start */
      <section id="Content">
        <FeaturedCarousel />

        <div className="products-list featured-products">
          <div className="container">
            <div className="row">
              {
                _.map(featured_products,
                  (p, index) =>
                  <Product key={index} name={p.name} slug={p.slug} image={p.image} price={p.price}/>
                )
              }
            </div>
          </div>
        </div>
      </section>
      /* jshint ignore:end */
    );
  }
}
