import { useEffect, useMemo, useState } from "react";
import "./Buscador.css";
import { Link } from "react-router-dom";

function Buscador() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/productos")
      .then(res => res.json())
      .then(data => setProductos(data.productos || []))
      .catch(err => console.error(err));
  }, []);

  const productosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();
    if (!texto) return [];

    return productos.filter((producto) =>
      (producto.titulo || "").toLowerCase().includes(texto)
    );
  }, [busqueda, productos]);

  return (
    <div className="box-buscador">
      <div className="buscador">
        <input type="text" className="box-text" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar producto..."/>

        <div className="resultados">
          {productosFiltrados.length > 0 &&
            productosFiltrados.slice(0, 8).map((producto) => (
              <Link key={producto.id} to={`/producto/${producto.id}`} className="resultado-item" onClick={() => setBusqueda("")}>
                  <img src={`http://zent.es/${producto.do_imagenes?.[0]?.url}`} />
                  <div className="Titulo-juego">
                    {producto.titulo} 
                    <div className="Plataformas-juego">{producto.do_juego.do_plataformas?.slice(0,1).map(p => p.nombre).join(", ")}</div>
                  </div>
                  <div className="precio-juego">{producto.precio} €</div>
              </Link>
            ))}

          {busqueda.trim() && productosFiltrados.length === 0 && (
            <p className="sin-resultados">No se encontraron productos</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Buscador;
