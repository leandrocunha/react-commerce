import $ from 'jquery';
import React from 'react';
import Router, {Route, DefaultRoute} from 'react-router';
import Page from './components/page';
import Content from './components/content';
import Tshirts from './components/tshirts';
import Hats from './components/hats';
import Contact from './components/contact';

/* jshint ignore:start */
global.$ = global.jQuery = $;

let routes = (
	<Route name='app' path='/' handler={Page}>
		<DefaultRoute handler={Content} />
    <Route name='tshirts' path='/tshirts' handler={Tshirts}/>
    <Route name='hats' path='/hats' handler={Hats}/>
    <Route name='contact' path='/contact' handler={Contact}/>
	</Route>
);

Router.run(
	routes, 
	Router.HashLocation, 
	RootComponent => React.render(<RootComponent />, document.getElementById('app'))
);
/* jshint ignore:end */
