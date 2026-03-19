import { Link } from "react-router-dom";
import "./AnuncioVideojuego.less";
import { useTranslation } from "react-i18next";

function AnuncioVideojuego({ 
  imageSrc = "/imagesideas/AnuncioJuego.jpg", 
  producto 
}) {
  const { t } = useTranslation();

  const backgroundStyle = {
    backgroundImage: `url(${imageSrc})`
  };

  return (
    <>
      <Link to={`/producto/${producto.id}`} className="AnuncioLink">
        <div className="Anuncio" style={backgroundStyle}>
          
          <div className="Precio">
            <h2>{producto.titulo}</h2>

            <div className="LineaPrecio">

              <p className="PrecioFinal">
                {producto.precio}€
              </p>

            </div>
          </div>  

        </div>
      </Link>
    </>
  );
}

export default AnuncioVideojuego;