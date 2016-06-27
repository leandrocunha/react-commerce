import React from 'react';
import {Link} from 'react-page';
export default class Footer extends React.Component {

	render(){

		return (
			/* jshint ignore:start */
			<footer id="f">
				<div className="container">
					<div className="leads">
						<div className="row">
							<div className="brand">
								<p>RC</p>
							</div>
							<div className="manifest">
								<p className="title">Manifest</p>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
							</div>
							<div className="links">
								<p className="title">Quick links</p>
								<ul className="nav-links">
									<li className="item"><a className="link" href="#">About Us</a></li>
									<li className="item">
                    <Link to='contact'>
                      Contact Us
                    </Link>
                  </li>
								</ul>
							</div>
							<div className="social">
							</div>
						</div>
					</div>
					<hr className="div" />
					<p className="company-data">React Commerce - Comércio de Roupas e Acessórios LTDA</p>
				</div>
			</footer>
			/* jshint ignore:end */
		);
	}
}
