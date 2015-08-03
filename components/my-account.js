import React from 'react';
import flux from './../flux/';

export default class MyAccount extends React.Component {

  render(){

    let user = flux.store.user.get();

    (!user) && this.context.router.transitionTo('login');

    return(
      /* jshint ignore:start */
      <section className="my-account" id="Content">
        <div className="page-content">
          <div className="container">
            <div className="row">
              <div className="form-wrapper">
                <h2>My Account</h2>
                <form>
                  <div className="form-row">
                    <label className="label">Name:</label>
                    <input className="input-text" name="email" ref="inputEmail" type="text" />
                  </div>
                  <div className="form-row">
                    <label className="label">Email:</label>
                    <input className="input-text" name="email" ref="inputEmail" type="text" />
                  </div>
                  <div className="form-row">
                    <label className="label">Password:</label>
                    <input className="input-text" name="password" ref="inputPassword" type="password" />
                  </div>
                  <div className="form-row">
                    <label className="label">Password again:</label>
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

MyAccount.contextTypes = {
  router: React.PropTypes.any.isRequired
};
