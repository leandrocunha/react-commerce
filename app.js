import $ from 'jquery';
import { Router, Route } from 'react-router';
import Page from './components/page.js';

global.$ = global.jQuery = $;

let routes = (
		<Router history={history}>
    	<Route path="/" component={Page}/>
  	</Router>
  );

Router.run(routes, Router.HashLocation, (Page) => {
	React.render(
		/* jshint ignore:start */
		<Page />,document.getElementById('app')
		/* jshint ignore:end */
	)
});
