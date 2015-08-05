import React from 'react';
import flux from './../flux/';

export default class MyAccount extends React.Component {

  _handleSubmit(e){
    e.preventDefault();

    return flux.actions.user.update($(e.target).serialize())
            .then(() => {
                console.log(flux.store.user.get());
            })
            .catch(showError);
  }

  _handleGender(e){
    e.preventDefault();
    console.log('gender updated');
  }

  componentDidMount() {

    let user = flux.store.user.get();
    this.setState(user);

    console.log(this.state);
  }

  render(){

    

    // if(!user){
    //   this.context.router.transitionTo('login');
    // }

    return(
      /* jshint ignore:start */
      <section className="my-account" id="Content">
        <div className="page-content">
          <div className="container">
            <div className="row">
              <div className="form-wrapper">
                <h2 className="title">My Account</h2>
                <form onSubmit={this._handleSubmit.bind(this)}>
                  <div className="form-row">
                    <label className="label">Name:</label>
                    <input className="input-text" name="email" ref="inputEmail" type="text" value={this.state.name} />
                  </div>
                  <div className="form-row">
                    <label className="label">Email:</label>
                    <input className="input-text" name="email" ref="inputEmail" type="text" value={this.state.name} />
                  </div>
                  <div className="form-row">
                    <label className="label">Gender:</label>
                    <select className="input-select" value={this.state.gender} onChange={this._handleGender.bind(this)}>
                      <option value="1">Female</option>
                      <option value="2">Male</option>
                    </select>
                  </div>
                  <div className="form-row">
                    <button className="submit" type="submit">Edit</button>
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
