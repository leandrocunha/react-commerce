import React from 'react';
import flux from './../flux/';

export default class MyAccount extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  _handleSubmit(e){
    e.preventDefault();

    this.setState({
      name: $(React.findDOMNode(this.refs.inputName)).val(),
      email: $(React.findDOMNode(this.refs.inputEmail)).val(),
      gender: $(React.findDOMNode(this.refs.inputGender)).val(),
      password: $(React.findDOMNode(this.refs.inputPassword)).val()
    });

    return flux.actions.user.new(this.state)
            .then(() => {
              console.log('success');
            })
            .catch((error) => {
              console.log(error);
            });
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
                <h2 className="title">New Account</h2>
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
                              <option key={i} value={gender.value}>{gender.gender}</option>
                            )
                        )
                      }
                    </select>
                  </div>
                  <div className="form-row">
                    <label className="label">Password:</label>
                    <input className="input-text" name="password" onChange={ e => {this.setState({ password: e.target.value }) } } ref="inputPassword" type="password" value={this.state.password} />
                  </div>
                  <div className="form-row">
                    <label className="label">Password again:</label>
                    <input className="input-text" name="password-again" ref="inputPasswordAgain" type="password" />
                  </div>
                  <div className="form-row">
                    <button className="submit" type="submit">Create Account</button>
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
