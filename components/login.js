import React from 'react';
import flux from './../flux/';

export default class Login extends React.Component {

  _handleSubmit(e){
    e.preventDefault();

    let email = $(React.findDOMNode(this.refs.inputEmail)).val();
    let password = $(React.findDOMNode(this.refs.inputPassword)).val();

    return flux.actions.user.login(email, password)
            .then(() => {
                this.context.router.transitionTo('app')
                console.log(flux.store.user.get())
            })
            .catch(showError);
  }

  render(){

    return(
      /* jshint ignore:start */
      <section className="login" id="Content">
        <div className="page-content">
          <div className="container">
            <div className="row">
              <div className="form-wrapper">
                <form onSubmit={this._handleSubmit.bind(this)}>
                  <div className="form-row">
                    <label className="label">Email:</label>
                    <input className="input-text" name="email" ref="inputEmail" type="text" />
                  </div>
                  <div className="form-row">
                    <label className="label">Senha:</label>
                    <input className="input-text" name="password" ref="inputPassword" type="password" />
                  </div>
                  <div className="form-row">
                    <button className="submit" type="submit">Login</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      /* jshint ignore:end */
    );
  }
}

Login.contextTypes = {
  router: React.PropTypes.any.isRequired
};
