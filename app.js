import $ from 'jquery'
import Page from './components/page.js'

global.$ = global.jQuery = $;

console.log('foo.js has been loaded');

React.render(
	<Page />,
	document.getElementById('app')
);
