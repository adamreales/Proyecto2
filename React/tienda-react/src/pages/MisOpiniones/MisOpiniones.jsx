import "./MisOpiniones.css";
import { useEffect, useState } from "react";
import { getMisValoraciones } from "../../services/valoraciones";

function MisOpiniones() {
  const [opiniones, setOpiniones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMisValoraciones()
      .then((data) => {
        setOpiniones(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        setError("No se pudieron cargar tus valoraciones.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="mis-opiniones-status">Cargando valoraciones...</p>;
  }

  return (
    <section className="mis-opiniones-page">
      <h1>Mis Opiniones</h1>

      {error && <p className="mis-opiniones-error">{error}</p>}

      {opiniones.length === 0 ? (
        <p className="mis-opiniones-status">Todavia no has realizado valoraciones.</p>
      ) : (
        <div className="mis-opiniones-list">
          {opiniones.map((opinion) => (
            <article className="mis-opiniones-item" key={opinion.id}>
              <div className="mis-opiniones-summary">
                {opinion.producto_imagen ? (
                  <img src={`http://zent.es/${opinion.producto_imagen}`} alt={opinion.producto_titulo || "Producto"} />
                ) : null}

                <div className="mis-opiniones-summary-text">
                  <p><b>Producto:</b> {opinion.producto_titulo || "Producto"}</p>
                  <p><b>Valoracion:</b> {"⭐".repeat(opinion.estrellas || 0)}</p>
                  <p><b>Comentario:</b> {opinion.comentario || "Sin comentario"}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default MisOpiniones;
