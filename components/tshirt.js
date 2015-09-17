import React from 'react';
import _ from 'lodash';
import Numeral from 'numeral';
import Flux from './../flux/';
import AddToCart from './add-to-cart';

export default class Tshirt extends React.Component {

  constructor(props){
    super(props);
    this.state = { quantity: 1 };
  }

  componentDidMount(){
    Flux.actions.product.show(this.context.router.getCurrentParams().slug);
    Flux.store.product.on('change', () => this.forceUpdate());
  }

  render(){
    
    let product = Flux.store.product.show();

    //@TODO: Melhorar esse retorno da api pra nao ter q fazer isso
    let p = (product) && product[0];

    let sizes = [
          {
            size: "s",
            label: "S"
          },
          {
            size: "m",
            label: "M"
          },
          {
            size: "l",
            label: "Large"
          },
          {
            size: "xl",
            label: "XL"
          },
          {
            size: "xxl",
            label: "XXL"
          }
        ];

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
                <h1 className="title">{(p) && p.name}</h1>
                <p>{(p) && Numeral(p.price).format('$ 0,0.00')}</p>
                <select className="input-size" name="size" onChange={ e => {this.setState({ size: e.target.value }) } } ref="inputSize" value={this.state.size}>
                  <option key="0" value="0">-- select --</option>
                  {
                    sizes.map(
                      (s, i) => (
                          <option key={i}
                                  value={s.size}>
                            {s.label}
                          </option>
                        )
                    )
                  }
                </select>

                <input min="1"
                       name="quantity"
                       onChange={ e => {this.setState({ quantity: e.target.value })} }
                       step="1"
                       type="number"
                       value={this.state.quantity} />

                <AddToCart pid={(p) && p._id}
                           name={(p) && p.name}
                           size={(this.state.size) && this.state.size}
                           quantity={this.state.quantity}
                           price={(p) && Numeral(p.price).format('$ 0,0.00')} />
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
