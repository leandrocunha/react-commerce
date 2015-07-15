import React from 'react';
import _ from 'lodash';
import flux from './../flux/';

export default class Tshirt extends React.Component {

  componentDidMount() {
    flux.get
  }

  render(){
    let slug = this.context.router.getCurrentParams().slug;
    console.log(slug);
    console.log(flux.store.tshirt.get(slug));

    return(
    	/* jshint ignore:start */
      <section className="product" id="Content">
        <div className="page-content">
          <div className="container">
            <div className="row">
              <div className="product-images">
                <p>Foto do produto</p>
              </div>
              <div className="product-info">
                <p>informacoes do produto</p>
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
