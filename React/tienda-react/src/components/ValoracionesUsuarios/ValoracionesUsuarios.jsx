import "./ValoracionesUsuarios.less";
import { useState } from "react";

function ValoracionesUsuarios({ producto }) {

  const [pagina, setPagina] = useState(0);
  const MaxValoraciones = 6;

  const inicio = pagina * MaxValoraciones;
  const fin = inicio + MaxValoraciones;
  function estrellas(n)
  {
    return "⭐".repeat(n);
  }
  return (
    <div className="valoraciones-container">
      <div className="valoraciones-header">
          <h2>Valoraciones de Usuarios</h2>

          <div className="valoraciones-botones">
            <button className="btn-prev-val" onClick={() => setPagina(pagina - 1)} disabled={pagina === 0}   ><img src="http://zent.es/imagenes_producto/correrizq.png" className="mario"/></button>
            <button className="btn-next-val"  onClick={() => setPagina(pagina + 1)}  disabled={fin >= producto.do_valoraciones.length}  >   <img src="http://zent.es/imagenes_producto/correr.png" className="mario mario-right"/></button>
        </div>
      </div>

      <div className="valoraciones-list">
        {producto.do_valoraciones.slice(inicio, fin).map((valoracion, index) => (
          <div className="valoracion-box" key={index}>
            <div className="valoracion-datos">
                <p>Nombre : {valoracion.name}</p>
                <p> {estrellas(valoracion.estrellas)}</p>
            </div>
            <p>{valoracion.comentario}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ValoracionesUsuarios;