import "./Caracteristicas.css";

function Caracteristicas({ producto }) {
  return (
    <div className="card-info">
      <h2>Características</h2>

      <div className="Especificado">
        <div className="box-informacion"><img src="http://zent.es/imagenes_producto/modo.png"/><strong>Género: </strong> {producto.do_juego?.genero || "Acción"}</div>
        <div className="box-informacion"><img src="http://zent.es/imagenes_producto/genero.png"/><strong>Modo:</strong> Single Player / Online</div>
        <div className="box-informacion"><img src="http://zent.es/imagenes_producto/plataformas.png"/><strong>Plataformas:</strong> {producto.do_juego.do_plataformas?.map(p => p.nombre).join(", ")}</div>
        <div className="box-informacion"><img src="http://zent.es/imagenes_producto/Lanzamiento.png"/><strong>Valoracion:</strong> {producto.valoracion || "No disponible"} / 5</div>
        <div className="box-informacion"><img src="http://zent.es/imagenes_producto/Idiomas.jpg"/><strong>Idiomas:</strong> Español, Inglés</div>
      </div>
    </div>
  );
}

export default Caracteristicas;