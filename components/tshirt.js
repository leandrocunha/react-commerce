import React from 'react';
import _ from 'lodash';

export default class Tshirt extends React.Component {

  render(){

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
