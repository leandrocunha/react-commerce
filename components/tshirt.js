import React from 'react';
import $ from 'jquery';
import _ from 'lodash';
import flux from './../flux/';

export default class Tshirt extends React.Component {

  componentDidMount() {
    // flux.actions.tshirt.show();
  }

  _fetchTshirt(slug){
    return flux.store.tshirt.get(slug);
  }

  render(){
    let slug = this.context.router.getCurrentParams().slug;
    let tshirt = this._fetchTshirt(slug);

    return(
      /* jshint ignore:start */
      <section className="product" id="Content">
        <div className="page-content">
          <div className="container">
            <div className="row">
              <div className="product-images">
                <img alt={tshirt.name} src={tshirt.image}/>
              </div>
              <div className="product-info">
                <h1>{tshirt.name}</h1>
                <p>{tshirt.price}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      /* jshint ignore:end */
    );
  }
}

Tshirt.contextTypes = {
  router: React.PropTypes.any.isRequired
};
