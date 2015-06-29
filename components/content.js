import _ from 'lodash';
import FeaturedProducts from './featured-products.js';

export default class Content extends React.Component {

  render(){

    let featured_products = {
      product: {
        name: "T-Shirt A",
        url: "/tshirt-a",
        image: "assets/img/tshirt-blue.jpg"
      },
      product: {
        name: "T-Shirt A",
        url: "/tshirt-a",
        image: "assets/img/tshirt-blue.jpg"
      },
      product: {
        name: "T-Shirt A",
        url: "/tshirt-a",
        image: "assets/img/tshirt-blue.jpg"
      },
      product: {
        name: "T-Shirt A",
        url: "/tshirt-a",
        image: "assets/img/tshirt-blue.jpg"
      }
    }

    return (
      <section id="Content">
        <div className="carousel">
          <img src="" />
        </div>

  			<div className="featured-products">
          <div className="container">
            {
              featured_products.map(
                product => (
                  <FeaturedProducts />
                )
              )
            }
          </div>
  			</div>
  		</section>
    );
  }
}
