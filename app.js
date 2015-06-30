import $ from 'jquery'
import Page from './components/page.js'

LazyLoad.js([`shared/vendors/owl.carousel/src/js/owl.carousel.js`], () => {

  global.jQuery = require('jquery');
  global.$ = jQuery;

});

React.render(
  <Page />,
  document.getElementById('app')
);
