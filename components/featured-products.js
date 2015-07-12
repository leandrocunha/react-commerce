import React from 'react';
export default class FeaturedProducts extends React.Component {

  render(){

    return (
    	/* jshint ignore:start */
      <div className="product">
        <img src={this.props.image} />
        <p className="name">{this.props.name}</p>
        <p className="price">{this.props.price}</p>
        <a className="btn" href={this.props.url}>see more</a>
      </div>
      /* jshint ignore:end */
    );
  }
}
