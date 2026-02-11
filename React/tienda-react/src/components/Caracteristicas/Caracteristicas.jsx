import "./Caracteristicas.css";

function Caracteristicas({ producto }) {
  return (
    <div className="card-info">
      <h2>Características</h2>

      <div className="Especificado">
        <img src="../imagesideas/modo.png"/><strong>Género: </strong> {producto.do_juego?.genero || "Acción"}
        <img src="../imagesideas/genero.png"/><strong>Modo:</strong> Single Player / Online
        <img src="../imagesideas/plataformas.png"/><strong>Plataformas:</strong> {producto.do_juego.do_plataformas?.map(p => p.nombre).join(", ")}
        <img src="../imagesideas/Lanzamiento.png"/><strong>Lanzamiento:</strong> {producto.fecha_lanzamiento || "2024"}
        <img src="../imagesideas/Idiomas.jpg"/><strong>Idiomas:</strong> Español, Inglés
      </div>
    </div>
  );
}

export default Caracteristicas;