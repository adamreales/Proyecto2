import "./Header.css"
import {Link} from "react-router-dom";

function Header()
{
	const token = localStorage.getItem("token");
    return(
    <header>	
			<div className="Logo">
				<Link to ="/"><button id="btn-logo"><img src="imagesideas/Logo.png"></img></button></Link>
			</div>	
			<div className="Barra-menu">
					<button className="menu-btn">VIDEOJUEGOS</button>
					<button className="menu-btn">CONSOLAS</button>
					<button className="menu-btn">MERCHANDISING</button>
					<Link to="/conocenos"><button className="menu-btn" id="btn-conocenos" >CONOCENOS</button>	</Link>
					<button className="menu-btn">OUTLET</button>
			</div>	
			<div className="Login">
				{!token && (
				<>
				<Link to="/login"><button className="Log">Login</button></Link>
				<Link to="/register"><button className="Reg">Registrate</button></Link>
				</>
				)}
				{token && (
					<>
					<Link to="/carrito"><button className="btn-carrito"><img src="public/imagesideas/carrito.png"></img></button></Link>
					<Link to="/profile"><button className="btn-perfil"><img src="public/imagesideas/perfil.png"></img></button></Link>
					</>
				)}

			</div>
	</header>
    );
}

export default Header