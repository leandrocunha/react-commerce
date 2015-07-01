export default class FeaturedCarousel extends React.Component {

	componentDidMount() {
		let loadOwljs = () =>
			LazyLoad.js(
				['shared/vendors/owl.carousel/src/js/owl.carousel.js'],
				() => $(React.findDOMNode(this.refs.featuredCarousel)).owlCarousel({
					singleItem: true
				})
			);

		LazyLoad.css([
			'shared/vendors/owl.carousel/src/css/owl.carousel.css',
			'shared/vendors/owl.carousel/src/css/owl.theme.default.css'
		], loadOwljs);
	}

	render() {

		return (
			<div className='featured-carousel'>
				<div className='slides-list owl-carousel' ref='featuredCarousel'>
					<div className='slide'>
						<img src='assets/img/slide1.jpg'/>
					</div>
					<div className='slide'>
						<img src='assets/img/slide2.jpg'/>
					</div>
					<div className='slide'>
						<img src='assets/img/slide3.jpg'/>
					</div>
				</div>
			</div>
		);
	}
}
