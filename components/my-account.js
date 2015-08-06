import React from 'react';
import flux from './../flux/';

export default class MyAccount extends React.Component {

  constructor(props){
    super(props);
    this.state = flux.store.user.get();
  }

  _handleSubmit(e){
    e.preventDefault();

    return flux.actions.user.update(this.state)
            .then(() => {
                console.log('success');
            })
            .catch(showError);
  }

  render(){

    let genders = [
          {
            gender: "Female",
            value: 1
          },
          {
            gender: "Male",
            value: 2
          }
        ];

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
                    <input className="input-text" name="name" onChange={ e => {this.setState({ name: e.target.value }) } } ref="inputName" type="text" value={this.state.name} />
                  </div>
                  <div className="form-row">
                    <label className="label">Email:</label>
                    <input className="input-text" name="email" onChange={ e => {this.setState({ email: e.target.value }) } } ref="inputEmail" type="email" value={this.state.email} />
                  </div>
                  <div className="form-row">
                    <label className="label">Gender:</label>
                    <select className="input-text" name="gender" onChange={ e => {this.setState({ gender: e.target.value }) } } ref="inputGender" value={this.state.gender}>
                      {
                        genders.map(
                          (gender, i) => (
                              <option key={i}
                                      value={gender.value}
                                      selected={(gender.value === this.state.gender) && `selected`}>
                                {gender.gender}
                              </option>
                            )
                        )
                      }
                    </select>
                  </div>
                  <div className="form-row">
                    <button className="submit" type="submit">Update</button>
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
