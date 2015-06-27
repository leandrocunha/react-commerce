export default class Header extends React.Component {

  render(){

    return (
      <header>
  			<div className="container">
  				<h1>React Commerce</h1>

          <nav className="nav-bar">
            <ul className="nav-list">
              <li><a href="#">Home</a></li>
              <li><a href="#">T-Shirts</a></li>
              <li><a href="#">Hats</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </nav>
  			</div>
  		</header>
    );
  }
}
