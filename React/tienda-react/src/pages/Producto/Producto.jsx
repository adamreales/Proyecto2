import "./Producto.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Caracteristicas from "../../components/Caracteristicas/caracteristicas";
import Requisitos from "../../components/Recomendaciones/Recomendaciones";

function Producto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [imgPrincipal, setImgPrincipal] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/producto/${id}?token=TU_TOKEN`)
      .then(res => res.json())
      .then(data => {
        setProducto(data.producto);
        setImgPrincipal(data.producto.do_imagenes?.[0]?.url);
      });
  }, [id]);

  if (!producto) return <p>Cargando...</p>;

  return (
    <>
      <div className="box">
        <div className="box-img">
          <img
            src={`http://zent.es/${imgPrincipal}`}
            alt={producto.titulo}
          />
        </div>

        <div className="box-datos">
          <div>
            <h1>{producto.titulo}</h1>
            <p>{producto.descripcion}</p>
          </div>

          <div className="Stream">
            <p>Steam | En stock | Descarga digital</p>
          </div>

          <select className="plataformas">
            {producto.do_juego.do_plataformas?.map(plataforma => (
              <option key={plataforma.id} value={plataforma.id}>
                {plataforma.nombre}
              </option>
            ))}
          </select>

          <div className="precio">
            <span className="final">{producto.precio} €</span>
          </div>

          <div className="btn-box">
            <button className="btn-favoritos">♡</button>
            <button className="btn-cesta">Añadir al Carrito</button>
          </div>
        </div>
      </div>

      <div className="imagenes">
        {producto.do_imagenes?.map((img, index) => (
          <div className="caja-imagen" key={index}>
            <img
              src={`http://zent.es/${img.url}`}
              alt={producto.titulo}
              onClick={() => setImgPrincipal(img.url)}
              className={imgPrincipal === img.url ? "activa" : ""}
            />
          </div>
        ))}
      </div>
    <div className="Descripciones">
        <Caracteristicas producto={producto} />
        {/* <Requisitos producto={producto} /> */}
    </div>
    </>
  );
}

export default Producto;