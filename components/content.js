import FeaturedProducts from './featured-products.js';

export default class Content extends React.Component {

  render(){

    return (
      <section id="Content">
        <div className="carousel">
          <img src="" />
        </div>

  			<div className="featured-products">
          <div className="container">
            <FeaturedProducts />
          </div>
  			</div>
  		</section>
    );
  }
}
