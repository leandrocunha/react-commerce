import _ from 'lodash';
import FeaturedCarousel from './featured-carousel'
import FeaturedProducts from './featured-products';

export default class Content extends React.Component {

  render(){

    let featured_products = [
      {
        name: 'T-Shirt A',
        url: '/tshirts/t-shirt-a',
        image: 'assets/img/tshirt-blue.jpg',
        price: '100'
      },
      {
        name: 'T-Shirt B',
        url: '/tshirts/t-shirt-b',
        image: 'assets/img/tshirt-red.jpg',
        price: '100'
      },
      {
        name: 'T-Shirt C',
        url: '/tshirts/t-shirt-c',
        image: 'assets/img/tshirt-blue.jpg',
        price: '100'
      },
      {
        name: 'T-Shirt D',
        url: '/tshirts/t-shirt-d',
        image: 'assets/img/tshirt-red.jpg',
        price: '100'
      }
    ];

    return (
      <section id="Content">
        <FeaturedCarousel />

  			<div className="featured-products">
          <div className="container">
            {
              _.map(featured_products,
                (p, index) =>
                <FeaturedProducts name={p.name} url={p.url} image={p.image} price={p.price}/>
              )
            }
          </div>
  			</div>
  		</section>
    );
  }
}
