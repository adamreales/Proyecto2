import { Link } from "react-router-dom";
import "./AnuncioVideojuego.less";

function AnuncioVideojuego({ imageSrc = "/imagesideas/AnuncioJuego.jpg" }) {
    const backgroundStyle = {
        backgroundImage: `url(${imageSrc})`
    };

    return (
        <>
            <Link to="/videojuegos" className="AnuncioLink"><div className="Anuncio" style={backgroundStyle}>
                <div className="Precio">
                    <h2>ARC RAIDERS</h2>

                    <div className="LineaPrecio">
                        <div className="Rebaja">
                            <p>-31%</p>
                        </div>

                        <p className="PrecioFinal">27.69 €</p>
                    </div>
                </div>  
            </div></Link>
        </>
    );
}

export default AnuncioVideojuego;