import $ from 'jquery';
import { Router, Route } from 'react-router';
import Page from './components/page.js';

global.$ = global.jQuery = $;

React.render(
	/* jshint ignore:start */
	<Router history={history}>
    <Route path="/" component={Page} />
  </Router>
	,document.getElementById('app')
	/* jshint ignore:end */
);
