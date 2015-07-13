import React from 'react';
import { Link } from 'react-router';

export default class Logotype extends React.Component {

  render(){

    return(
    	/* jshint ignore:start */
      <div className="logotype-wrapper">
        <h1>
        	<Link to="/">React Commerce</Link>
        </h1>
      </div>
      /* jshint ignore:end */
    );
  }
}
