import $ from 'jquery';
import React from 'react';
import Router, {Route, DefaultRoute} from 'react-router';
import Page from './components/page.js';
import Content from './components/content.js';
import Tshirts from './components/tshirts.js';
import Hats from './components/hats.js';

/* jshint ignore:start */
global.$ = global.jQuery = $;

let routes = (
	<Route name='app' path='/' handler={Page}>
		<DefaultRoute handler={Content} />
    <Route name='tshirts' path='/tshirts' handler={Tshirts}/>
    <Route name='hats' paths='/hats' handler={Hats}/>
	</Route>
);

Router.run(
	routes, 
	Router.HashLocation, 
	RootComponent => React.render(<RootComponent />, document.getElementById('app'))
);
/* jshint ignore:end */
