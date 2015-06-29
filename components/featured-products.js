export default class FeaturedProducts extends React.Component {

  render(){

    return (
      <div className="product">
        <img src={this.props.image} />
        <p>{this.props.name}</p>
        <p>{this.props.price}</p>
        <a href={this.props.url}>see more</a>
      </div>
    );
  }
}
