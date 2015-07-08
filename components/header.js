import Logotype from './logotype.js';

export default class Header extends React.Component {

  render(){

    return (
    	/* jshint ignore:start */
      <header>
  			<div className="container">
          <div className="row">
    				<Logotype />

            <nav className="nav-bar">
              <ul className="nav-list">
                <li className="item"><a href="#">Home</a></li>
                <li className="item"><a href="#">T-Shirts</a></li>
                <li className="item"><a href="#">Hats</a></li>
                <li className="item"><a href="#">Contact Us</a></li>
                <li className="item login"><a href="#">Login</a></li>
              </ul>
            </nav>
          </div>
  			</div>
  		</header>
  		/* jshint ignore:end */
    );
  }
}
