// LazyLoad.css([]);

LazyLoad.js([
  `${RC.baseURL}build/js/vendors.js`
], () => {

  const _ = require('lodash');

  global.React = require('react');
  _.assign(global.React, require('react-dom'));
  
  global.jQuery = require('jquery');
  global.$ = jQuery;

  LazyLoad.js([], () => require('./router'));
});


// import $ from 'jquery';
// import React from 'react';
// import Router, {Route, DefaultRoute} from 'react-router';
// import Page from './components/page';
// import Content from './components/content';
// import Tshirts from './components/tshirts';
// import Hats from './components/hats';
// import Contact from './components/contact';
// import Login from './components/login';
// import Product from './components/tshirt';
// import MyCart from './components/my-cart';
// import MyAccount from './components/my-account';
// import CreateAccount from './components/create-account';

// /* jshint ignore:start */
// global.$ = global.jQuery = $;

// let routes = (
// 	<Route name='app' path='/' handler={Page}>
// 		<DefaultRoute handler={Content} />
//     <Route name='tshirts' path='/tshirts' handler={Tshirts}/>
//     <Route name='hats' path='/hats' handler={Hats}/>
//     <Route name='contact' path='/contact' handler={Contact}/>
//     <Route name='login' path='/login' handler={Login}/>
//     <Route name='tshirt' path='/tshirt/:slug' handler={Product}/>
//     <Route name='my-cart' path='/my-cart' handler={MyCart}/>
//     <Route name='my-account' path='/my-account' handler={MyAccount}/>
//     <Route name='create-account' path='/create-account' handler={CreateAccount}/>
// 	</Route>
// );

// Router.run(
// 	routes, 
// 	Router.HashLocation, 
// 	RootComponent => React.render(<RootComponent />, document.getElementById('app'))
// );
// /* jshint ignore:end */
