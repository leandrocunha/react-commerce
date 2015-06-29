import _ from 'lodash';
import FeaturedProducts from './featured-products.js';

export default class Content extends React.Component {

  render(){

    let featured_products = [
      {
        name: 'T-Shirt A',
        url: '/tshirts/t-shirt-a',
        price: '100'
      },
      {
        name: 'T-Shirt B',
        url: '/tshirts/t-shirt-b',
        price: '100'
      },
      {
        name: 'T-Shirt C',
        url: '/tshirts/t-shirt-c',
        price: '100'
      },
      {
        name: 'T-Shirt D',
        url: '/tshirts/t-shirt-d',
        price: '100'
      }
    ];

    return (
      <section id="Content">
        <div className="carousel">
          <img src="" />
        </div>

  			<div className="featured-products">
          <div className="container">
            {
              _.map(featured_products,
                (product, index) =>
                <FeaturedProducts />
              )
            }
          </div>
  			</div>
  		</section>
    );
  }
}
