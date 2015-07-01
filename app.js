import $ from 'jquery'
import Page from './components/page.js'

global.$ = global.jQuery = $;

React.render(
	<Page />,
	document.getElementById('app')
);
