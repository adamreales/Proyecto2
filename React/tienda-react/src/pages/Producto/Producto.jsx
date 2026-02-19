import "./Producto.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Caracteristicas from "../../components/Caracteristicas/Caracteristicas";
import Recomendaciones from "../../components/Recomendaciones/Recomendaciones";
import SeccionProductos from "../../components/SeccionProductos/SeccionProductos";

function Producto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [imgPrincipal, setImgPrincipal] = useState(null);
  const [masVendidos,setMasVendidos] = useState([]);
  const masVendidosFiltrados = masVendidos.filter((p) => p.id !== producto?.id);

  const getSessionId = () => {
    let sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem("sessionId", sessionId);
    }
    return sessionId;
  };

  const handleAddToCart = async () => {
    if (!producto) {
      return;
    }

    const sessionId = getSessionId();

    try {
      await fetch("http://localhost:8000/api/crear_carrito", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session_id: sessionId }),
      });

      const res = await fetch("http://localhost:8000/api/anadir_carrito", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_producto: producto.id,
          cantidad: 1,
          session_id: sessionId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "No se pudo añadir al carrito");
      }

      window.dispatchEvent(new Event("carritoActualizado"));
    } catch (error) {
      console.error("Error al añadir al carrito:", error);
    }
  };
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/producto/${id}?token=TU_TOKEN`)
      .then(res => res.json())
      .then(data => {
        setProducto(data.producto);
        setImgPrincipal(data.producto.do_imagenes?.[0]?.url);
      });
  }, [id]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/productos_mas_vendidos")
        .then(res => res.json())
        .then(data => setMasVendidos(data.productos))
        .catch(err => console.error(err));
  }, []);

  if (!producto) {
    return <div>Cargando...</div>;
  }
    
  return (
    <>
      <div className="box">
        <div className="box-img">
          <img
            src={`http://zent.es/${imgPrincipal}`}
            alt={producto?.titulo || "Producto"}
          />
        </div>

        <div className="box-datos">
          <div>
            <h1>{producto?.titulo}</h1>
            <p>{producto?.descripcion}</p>
          </div>

          <div className="Stream">
            <p>Steam | En stock | Descarga digital</p>
          </div>

          <select className="plataformas">
            {producto?.do_juego?.do_plataformas?.map(plataforma => (
              <option key={plataforma.id} value={plataforma.id}>
                {plataforma.nombre}
              </option>
            ))}
          </select>

          <div className="precio">
            <span className="final">{producto?.precio} € </span>
            <p>Valoraciones :  {"⭐".repeat(producto?.valoracion || 0)}</p>
          </div>

          <div className="btn-box">
            <button className="btn-favoritos">♡</button>
            <button className="btn-cesta" onClick={handleAddToCart}>
              Añadir al Carrito
            </button>
          </div>
        </div>
      </div>

      <div className="imagenes">
        {producto?.do_imagenes?.map((img, index) => (
          <div className="caja-imagen" key={index}>
            <img
              src={`http://zent.es/${img.url}`}
              alt={producto?.titulo || "Producto"}
              onClick={() => setImgPrincipal(img.url)}
              className={imgPrincipal === img.url ? "activa" : ""}
            />
          </div>
        ))}
      </div>
      <div className="Descripciones">
          <Caracteristicas producto={producto} />
      </div>
      <Recomendaciones producto={producto} />

      <SeccionProductos titulo="Lo Mas Vendidos" productos={masVendidosFiltrados} reload={true} />
    </>
  );
}

export default Producto;