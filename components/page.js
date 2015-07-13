import React from 'react';
import Header from './header.js';
import {RouteHandler} from 'react-router';
import Footer from './footer.js';
import Content from './content.js';

export default class Page extends React.Component {
  render() {

    return (
    	/* jshint ignore:start */
      <div id="Page">
        <Header />
        <RouteHandler />
        <Footer />
      </div>
      /* jshint ignore:end */
    );
  }
}
