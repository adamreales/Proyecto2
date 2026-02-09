import "./Valoraciones.css"
import {Link} from "react-router-dom";

function Valoraciones()
{
    return(
		<>
			<h2>Valoraciones</h2>
			<div className="Valoraciones">
				<div className="imagenfundador"></div>
				<div className="BloqueInformativo">
					<div className="Estrellas">
						<p>⭐⭐⭐⭐⭐</p>
					</div>
					<div className="Informacion">
						<p>ZENT es una plataforma increíble para comprar juegos de PC, PlayStation, Xbox y Switch a precios más bajos, con entrega instantánea las 24 horas del día.</p>
					</div>
					<button className="BotonValoraciones">1,568,884 user feedbacks</button>
				</div>
			</div>
		</>
    );
}

export default Valoraciones