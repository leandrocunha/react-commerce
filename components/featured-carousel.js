import $ from 'jquery'

export default class FeaturedCarousel extends React.Component {

  componentDidMount(){
    LazyLoad.js([`shared/vendors/owl.carousel/src/js/owl.carousel.js`], () => {
      $(React.findDOMNode(this.refs.featuredCarousel)).owlCarousel();
    });
  }

  render(){

    return(
      <div className="featured-carousel" ref="featuredCarousel">
        <ul className="slides-list">
          <li className="slide">
            <img src="assets/img/slide1.jpg" />
          </li>
          <li className="slide">
            <img src="assets/img/slide2.jpg" />
          </li>
          <li className="slide">
            <img src="assets/img/slide3.jpg" />
          </li>
        </ul>
      </div>
    );
  }
}
