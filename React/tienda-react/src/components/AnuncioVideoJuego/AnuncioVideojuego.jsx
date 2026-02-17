import { Link } from "react-router-dom";
import "./AnuncioVideojuego.less";

function AnuncioVideojuego({ imageSrc = "/imagesideas/AnuncioJuego.jpg" ,producto}) {
    const backgroundStyle = {
        backgroundImage: `url(${imageSrc})`
    };

    return (
        <>
            <Link to={`/producto/${producto.id}`} className="AnuncioLink"><div className="Anuncio" style={backgroundStyle}>
                <div className="Precio">
                    <h2>{producto.titulo}</h2>

                    <div className="LineaPrecio">
                        <div className="Rebaja">
                            <p>-31%</p>
                        </div>

                        <p className="PrecioFinal">{producto.precio}€</p>
                    </div>
                </div>  
            </div></Link>
        </>
    );
}

export default AnuncioVideojuego;