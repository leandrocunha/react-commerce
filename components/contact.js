import React from 'react';

export default class Contact extends React.Component {

  render(){

    return(
      /* jshint ignore:start */
      <section className="contact" id="Content">
        <header className="header">
          <div className="container">
            <h1 className="title">Contact</h1>
          </div>
        </header>
        <div className="page-content">
          <div className="container">
            <div className="row">
              <div className="form-wrapper">
                <form>
                  <div className="form-row">
                    <label className="label">Name:</label>
                    <input className="input-text" type="text" />
                  </div>
                  <div className="form-row">
                    <label className="label">Email:</label>
                    <input className="input-text" type="text" />
                  </div>
                  <div className="form-row">
                    <label className="label">Message:</label>
                    <textarea className="textarea"></textarea>
                  </div>
                  <div className="form-row">
                    <button className="submit" type="submit">Send Message</button>
                  </div>
                </form>
              </div>
              <div className="support-info">
                <p>If you prefer, send email to contact@email.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      /* jshint ignore:end */
    );
  }
}
