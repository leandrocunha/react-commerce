import Header from './header.js';
import Footer from './footer.js';

export default class Page extends React.Component {

  render(){

    return (
      <div id="Page">
        <Header />
        <Footer />
      </div>
    );
  }
}
