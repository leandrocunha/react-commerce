import React from 'react';

export default class Login extends React.Component {

  render(){

    return(
      /* jshint ignore:start */
      <section className="login" id="Content">
        <div className="page-content">
          <div className="container">
            <div className="row">
              <div className="form-wrapper">
                <form>
                  <div className="form-row">
                    <label className="label">Email:</label>
                    <input className="input-text" type="text" />
                  </div>
                  <div className="form-row">
                    <label className="label">Senha:</label>
                    <input className="input-text" type="password" />
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
