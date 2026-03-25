import "./Producto.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Caracteristicas from "../../components/Caracteristicas/Caracteristicas";
import Recomendaciones from "../../components/Recomendaciones/Recomendaciones";
import SeccionProductos from "../../components/SeccionProductos/SeccionProductos";
import ValoracionesUsuarios from "../../components/ValoracionesUsuarios/ValoracionesUsuarios";

function Producto() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();

  const [producto, setProducto] = useState(null);
  const [imgPrincipal, setImgPrincipal] = useState(null);
  const [masVendidos, setMasVendidos] = useState([]);
  const [descripcionTraducida, setDescripcionTraducida] = useState("");
  const [traduciendoDescripcion, setTraduciendoDescripcion] = useState(false);
  const [plataformaSeleccionada, setPlataformaSeleccionada] = useState(null);

  const masVendidosFiltrados = masVendidos.filter(
    (p) => p.id !== producto?.id
  );

  const getSessionId = () => {
    let sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem("sessionId", sessionId);
    }
    return sessionId;
  };

  const handleAddToCart = async () => {
    if (!producto || !plataformaSeleccionada) return;

    const sessionId = getSessionId();
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      "X-Session-Id": sessionId,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    try {
      await fetch("http://localhost:8000/api/crear_carrito", {
        method: "POST",
        headers,
      });

      const res = await fetch(
        "http://localhost:8000/api/anadir_carrito",
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            id_producto: producto.id,
            cantidad: 1,
            id_plataforma: plataformaSeleccionada,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error");
      }

      window.dispatchEvent(new Event("carritoActualizado"));
    } catch (error) {
      console.error("Error al añadir al carrito:", error);
    }
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/producto/${id}?token=TU_TOKEN`)
      .then((res) => res.json())
      .then((data) => {
        setProducto(data.producto);
        setImgPrincipal(data.producto.do_imagenes?.[0]?.url);
      });
  }, [id]);

  useEffect(() => {
    if (producto?.do_plataformas?.length > 0) {
      setPlataformaSeleccionada(Number(producto.do_plataformas[0].id));
    } else {
      setPlataformaSeleccionada(null);
    }
  }, [producto]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/productos_mas_vendidos")
      .then((res) => res.json())
      .then((data) => setMasVendidos(data.productos))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const traducirDescripcion = async () => {
      const descripcion = producto?.descripcion?.trim();

      if (!descripcion) {
        setDescripcionTraducida("");
        return;
      }

      if (i18n.language === "es") {
        setDescripcionTraducida(descripcion);
        return;
      }

      const targetLanguage = i18n.language === "cat" ? "ca" : i18n.language;
      setTraduciendoDescripcion(true);

      try {
        const response = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(descripcion)}&langpair=es|${targetLanguage}`
        );

        const data = await response.json();
        const textoTraducido = data?.responseData?.translatedText;

        setDescripcionTraducida(textoTraducido || descripcion);
      } catch (error) {
        console.error("Error al traducir descripción:", error);
        setDescripcionTraducida(descripcion);
      } finally {
        setTraduciendoDescripcion(false);
      }
    };

    traducirDescripcion();
  }, [producto?.descripcion, i18n.language]);

  function escollirpegi() {
    const edad = producto?.do_pegi?.edad;
    if (edad === 3) return "pegi3.jpg";
    if (edad === 7) return "pegi7.jpg";
    if (edad === 12) return "pegi12.png";
    if (edad === 16) return "pegi16.png";
    return "pegi18.png";
  }

  if (!producto) {
    return <div>{t("product.loading")}</div>;
  }

  const valoracion = Math.max(
    0,
    Math.min(5, Math.round(producto?.valoracion || 0))
  );

  function fav(productoId){
    if(loginRedirect()) return;
    const sessionId = getSessionId();
    const token = localStorage.getItem("token");

    fetch(`http://127.0.0.1:8000/api/favorito`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Session-Id": sessionId,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ producto_id: productoId }),
    });
  }

  function loginRedirect() {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href="/login";
      return;
    }else
    {
        console.lof("Usuario ya logueado");
    }

  }

  return (
    <>
      <div className="box">
        <div className="box-img">
          <img src={`http://zent.es/${imgPrincipal}`}alt={producto?.titulo || "Producto"}/>
        </div>

        <div className="box-datos">
          <div>
            <h1>{producto?.titulo}</h1>
            <p>
              {traduciendoDescripcion
                ? t("product.translatingDescription")
                : descripcionTraducida || producto?.descripcion}
            </p>
          </div>

          <div className="contenedorpegiplataformas">
            <div className="pegi">
              <img src={`http://zent.es/imagenes_producto/${escollirpegi()}`}/>
            </div>

            <div className="scriptplataformas">
              <span className="final">{producto?.precio} €</span>

              <select
                className="plataformas"
                value={plataformaSeleccionada ?? ""}
                onChange={(e) => setPlataformaSeleccionada(Number(e.target.value))}
              >
                {producto?.do_plataformas?.map((plataforma) => (
                  <option key={plataforma.id} value={plataforma.id}>
                    {plataforma.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <p className="valoracion-estrellas">
            {t("product.ratings")} :
            {Array.from({ length: valoracion }, (_, index) => (
              <span key={index} className="estrella llena">⭐</span>
            ))}
          </p>

          <div className="btn-box">
            <button className="btn-favoritos" onClick={() => fav(producto?.id)}>❤️</button>

            <button className="btn-cesta" onClick={handleAddToCart}>
              {t("product.addToCart")}
            </button>
          </div>
        </div>
      </div>

      <div className="imagenes">
        {producto?.do_imagenes?.map((img, index) => (
          <div className="caja-imagen" key={index}>
            <img src={`http://zent.es/${img.url}`}     alt={producto?.titulo || "Producto"} onClick={() => setImgPrincipal(img.url)}   className={imgPrincipal === img.url ? "activa" : ""}  />
          </div>
        ))}
      </div>

      <div className="Descripciones">
        <Caracteristicas producto={producto} />
      </div>

      <ValoracionesUsuarios producto={producto} />

      <Recomendaciones producto={producto} />

      <SeccionProductos titulo={t("product.bestSellers")}  productos={masVendidosFiltrados}  reload={true} />
    </>
  );
}

export default Producto;