import React from 'react';

export default class Login extends React.Component {

  _handleSubmit(e){
    e.preventDefault();

    let loginComponent = this;

    $.post(`${RC.apiURL}/login`, $(e.target).serialize())
      .done(msg => console.log(msg))
      .fail(xhr => console.log(xhr));
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
                    <input className="input-text" name="email" type="text" />
                  </div>
                  <div className="form-row">
                    <label className="label">Senha:</label>
                    <input className="input-text" name="password" type="password" />
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
