import React from 'react';
import ReactDOM from 'react-dom';
import {actions, store} from './flux/';
import Page from 'react-page';

import Main from './components/page';
import Home from './components/content';
import Tshirts from './components/tshirts';
import Hats from './components/hats';
import Contact from './components/contact';
import Loading from './components/loading';
import Login from './components/login';
import MyCart from './components/my-cart';
import MyAccount from './components/my-account';
import Product from './components/tshirt';

const render = RootComponent => ReactDOM.render(<RootComponent />, document.getElementById('app'));

function getCart ({params}) {
  
  const user = store.user.get();
  
  return actions.cart.get(user);
}

Page.base(RC.baseURL || '/');

Page.set(render)
  .with(Main)
  .on(
    'app',
    '/',
    Home
  )
  .on(
    'tshirts',
    '/tshirts',
    Tshirts
  )
  .on(
    'tshirt',
    '/tshirt/:slug',
    Product
  )
  .on(
    'hats',
    '/hats',
    Hats
  )
  .on(
    'contact',
    '/contact',
    Contact
  )
  .on(
    'login',
    '/login',
    Login
  )
  .on(
    'my-cart',
    '/my-cart',
    Page.when(
      getCart,
      MyCart,
      null,
      Loading
    )
  )
  .on(
    'my-account',
    '/my-account',
    MyAccount
  )
  .run();
