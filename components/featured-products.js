export default class FeaturedProducts extends React.Component {

  render(){

    return (
      <div className="product">
        <img src={this.props.image} />
        <p className="name">{this.props.name}</p>
        <p className="price">{this.props.price}</p>
        <a className="btn" href={this.props.url}>see more</a>
      </div>
    );
  }
}
