import $ from 'jquery';
import Page from './components/page.js';

global.$ = global.jQuery = $;

React.render(
	/* jshint ignore:start */
	<Page />,document.getElementById('app');
	/* jshint ignore:end */
);
