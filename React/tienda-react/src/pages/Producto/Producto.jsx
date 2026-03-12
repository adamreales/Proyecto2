import "./Producto.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Caracteristicas from "../../components/Caracteristicas/Caracteristicas";
import Recomendaciones from "../../components/Recomendaciones/Recomendaciones";
import SeccionProductos from "../../components/SeccionProductos/SeccionProductos";
import ValoracionesUsuarios from "../../components/ValoracionesUsuarios/ValoracionesUsuarios";

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
          "X-Session-Id" : sessionId
        }
      });

      const res = await fetch("http://localhost:8000/api/anadir_carrito", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Session-Id" : sessionId
        },
        body: JSON.stringify({
          id_producto: producto.id,
          cantidad: 1
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

  function escollirpegi() {
    if(producto?.do_juego?.do_pegi?.[0]?.edad === 3){
      return "pegi3.jpg";
    }
    else if(producto?.do_juego?.do_pegi?.[0]?.edad === 7){
      return "pegi7.jpg";
    }else if(producto?.do_juego?.do_pegi?.[0]?.edad === 12){
      return "pegi12.png";
    }else if(producto?.do_juego?.do_pegi?.[0]?.edad === 16){
      return "pegi16.png";
    }else{
      return "pegi18.png";
    }
  }
  if (!producto) {
    return <div>Cargando...</div>;
  }

  const valoracion = Math.max(0, Math.min(5, Math.round(producto?.valoracion || 0)));
    
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

          <div className="contenedorpegiplataformas">
              <div className="pegi">
                  <img src={`http://zent.es/imagenes_producto/${escollirpegi()}`}/>
              </div>
              <div className="scriptplataformas">
                <span className="final">{producto?.precio} € </span>
                <select className="plataformas">
                  {producto?.do_juego?.do_plataformas?.map(plataforma => (
                    <option key={plataforma.id} value={plataforma.id}>
                      {plataforma.nombre}
                    </option>
                  ))}
                </select>
              </div>
          </div>
          <p className="valoracion-estrellas">
            Valoraciones :
            {Array.from({ length: valoracion }, (_, index) => (
              <span
                key={index}
                className="estrella llena"
                aria-hidden="true"
              >
                ⭐ 
              </span>
            ))}
          </p>

          <div className="btn-box">
            <button className="btn-favoritos">❤️</button>
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
      <ValoracionesUsuarios producto={producto}/>
      <Recomendaciones producto={producto} />

      <SeccionProductos titulo="Lo Mas Vendidos" productos={masVendidosFiltrados} reload={true} />
    </>
  );
}

export default Producto;