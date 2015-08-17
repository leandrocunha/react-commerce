import React from 'react';
import _ from 'lodash';
import Flux from './../flux/';

export default class Tshirt extends React.Component {

  componentDidMount(){
    Flux.actions.product.show(this.context.router.getCurrentParams().slug);
    Flux.store.product.on('change', () => this.forceUpdate());
  }

  render(){
    
    let product = Flux.store.product.show();

    //@TODO: Melhorar esse retorno da api pra nao ter q fazer isso
    let p = (product) && product[0];

    return(
      /* jshint ignore:start */
      <section className="product" id="Content">
        <div className="page-content">
          <div className="container">
            <div className="row">             
              <div className="product-images">
                <img alt={(p) && p.name} src={`admin/public/images/${(p) && p.image}`} />
              </div>
              <div className="product-info">
                <h1>{(p) && p.name}</h1>
                <p>{(p) && p.price}</p>
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
