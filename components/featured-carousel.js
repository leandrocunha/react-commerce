

export default class FeaturedCarousel extends React.Component {

	componentDidMount() {

		let slick = () =>
			LazyLoad.js(['node_modules/slick-carousel/slick/slick.js'],
				() => $(React.findDOMNode(this.refs.featuredCarousel)).slick({
					autoplay: true
				})
			);

			LazyLoad.css([
				'node_modules/slick-carousel/slick/slick.css',
				'node_modules/slick-carousel/slick/slick-theme.css',
			], slick);
	}

	render() {

		return (
			<div className='featured-carousel'>
				<div className='slides-list' ref='featuredCarousel'>
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
