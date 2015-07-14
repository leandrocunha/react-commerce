import React from 'react';
import { Link } from 'react-router';

export default class Product extends React.Component {

  render(){

    return (
    	/* jshint ignore:start */
      <div className="product">
        <img src={this.props.image} />
        <p className="name">{this.props.name}</p>
        <p className="price">{this.props.price}</p>
        <Link className="btn" to='tshirt' params={{slug: this.props.slug}}>
          see more
        </Link>
      </div>
      /* jshint ignore:end */
    );
  }
}
