import "./Header.css"
import {Link} from "react-router-dom";

function Header()
{
    return(
    <header>	
			<div className="Logo">
				<Link to ="/home"><button id="btn-logo"><img src="imagesideas/Logo.png"></img></button></Link>
			</div>	
			<div class="Barra-menu">
					<button class="menu-btn">VIDEOJUEGOS</button>
					<button class="menu-btn">CONSOLAS</button>
					<button class="menu-btn">MERCHANDISING</button>
					<Link to="/conocenos"><button class="menu-btn" id="btn-conocenos" >CONOCENOS</button>	</Link>
					<button class="menu-btn">OUTLET</button>
			</div>	
			<div class="Login">
				<Link to="/login"><button class="Log">Login</button></Link>
				<Link to="/Register"><button class="Reg">Registrate</button></Link>
			</div>
	</header>
    );
}

export default Header