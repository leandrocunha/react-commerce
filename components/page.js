import Header from './header.js';
import Content from './content.js';
import Footer from './footer.js';

export default class Page extends React.Component {

  render(){

    return (
    	/* jshint ignore:start */
      <div id="Page">
        <Header />
        <Content />
        <Footer />
      </div>
      /* jshint ignore:end */
    );
  }
}
