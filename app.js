import $ from 'jquery'
import Page from './components/page.js'

LazyLoad.js([`shared/vendors/owl.carousel/src/js/owl.carousel.js`], () => {

  global.jQuery = require('jquery');
  global.$ = jQuery;
  console.log('foo.js has been loaded');

  React.render(
    <Page />,
    document.getElementById('app')
  );

});
