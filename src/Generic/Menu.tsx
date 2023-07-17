import "./Menu.css";
import logo from '../img/CRAFT-logo.png';

import { useNavigate } from "react-router-dom";


const SiteHeader = () => {
	const navigate = useNavigate();
	return (
  	<header className="">
		<div className="cc">
			<nav className="site-nav">
				<a href="/" className="brand"><img src={logo} title="CRAFT" /></a>
				<ul className="site-links">
					<li><button onClick={() => navigate("/dash/about")}>About</button></li>
					<li><button onClick={() => navigate("/dash/resources")}>Resources</button></li>
					<li><button onClick={() => navigate("/dash/about")}>People</button></li>
				</ul>
			</nav>
		</div>
  	</header>
	)
};

export default SiteHeader;
