import "./Producto.css";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import Caracteristicas from "../../components/Caracteristicas/Caracteristicas";
import Recomendaciones from "../../components/Recomendaciones/Recomendaciones";
import SeccionProductos from "../../components/SeccionProductos/SeccionProductos";
import ValoracionesUsuarios from "../../components/ValoracionesUsuarios/ValoracionesUsuarios";
import { anadirValoracion, getPuedeValorar } from "../../services/valoraciones";

function Producto() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();

  const [producto, setProducto] = useState(null);
  const [imgPrincipal, setImgPrincipal] = useState(null);
  const [masVendidos, setMasVendidos] = useState([]);
  const [descripcionTraducida, setDescripcionTraducida] = useState("");
  const [traduciendoDescripcion, setTraduciendoDescripcion] = useState(false);
  const [plataformaSeleccionada, setPlataformaSeleccionada] = useState(null);
  const [estrellasValoracion, setEstrellasValoracion] = useState(5);
  const [comentarioValoracion, setComentarioValoracion] = useState("");
  const [enviandoValoracion, setEnviandoValoracion] = useState(false);
  const [errorValoracion, setErrorValoracion] = useState("");
  const [okValoracion, setOkValoracion] = useState("");
  const [esFavorito, setEsFavorito] = useState(false);
  const [favoritoRegistroId, setFavoritoRegistroId] = useState(null);
  const [actualizandoFavorito, setActualizandoFavorito] = useState(false);
  const [mensajeAccion, setMensajeAccion] = useState("");
  const [tipoMensajeAccion, setTipoMensajeAccion] = useState("ok");
  const avisoTimeoutRef = useRef(null);
  const [estadoValoracion, setEstadoValoracion] = useState({
    ha_comprado: false,
    ya_valorado: false,
    puede_valorar: false,
  });

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

  const mostrarAviso = (mensaje, tipo = "ok") => {
    setMensajeAccion(mensaje);
    setTipoMensajeAccion(tipo);

    if (avisoTimeoutRef.current) {
      clearTimeout(avisoTimeoutRef.current);
    }

    avisoTimeoutRef.current = setTimeout(() => {
      setMensajeAccion("");
      setTipoMensajeAccion("ok");
    }, 2600);
  };

  const obtenerHeadersAuth = (token) => ({
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  const leerRespuestaApi = async (res) => {
    const raw = await res.text();

    if (!raw) {
      return { data: null, raw: "" };
    }

    try {
      return { data: JSON.parse(raw), raw };
    } catch {
      return { data: null, raw };
    }
  };

  const cargarEstadoFavorito = async (productoIdParam = id) => {
    const token = localStorage.getItem("token");

    if (!token || !productoIdParam) {
      setEsFavorito(false);
      setFavoritoRegistroId(null);
      return false;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/productos_favoritos", {
        method: "GET",
        headers: obtenerHeadersAuth(token),
      });

      const data = await res.json();
      const favoritos = data?.productos || [];

      const favoritoActual = favoritos.find((fav) => {
        const favoritoProductoId =
          fav?.producto_id ??
          fav?.id_producto ??
          fav?.do_producto?.id ??
          fav?.producto?.id;

        return Number(favoritoProductoId) === Number(productoIdParam);
      });

      const existe = Boolean(favoritoActual);
      const registroId = favoritoActual?.id ?? favoritoActual?.favorito_id ?? null;

      setEsFavorito(existe);
      setFavoritoRegistroId(registroId);

      return existe;
    } catch (error) {
      console.error("Error al consultar favoritos:", error);
      setEsFavorito(false);
      setFavoritoRegistroId(null);
      return false;
    }
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
      mostrarAviso(t("product.addedToCartSuccess"));
    } catch (error) {
      console.error("Error al añadir al carrito:", error);
    }
  };

  const recargarProducto = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/producto/${id}?token=TU_TOKEN`);
      const data = await res.json();
      setProducto(data.producto);
      setImgPrincipal(data.producto.do_imagenes?.[0]?.url);
    } catch (error) {
      console.error("Error al recargar producto:", error);
    }
  };

  const handleEnviarValoracion = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    setErrorValoracion("");
    setOkValoracion("");
    setEnviandoValoracion(true);

    try {
      await anadirValoracion({
        id_producto: producto.id,
        estrellas: Number(estrellasValoracion),
        comentario: comentarioValoracion,
      });

      setOkValoracion("Valoracion enviada correctamente.");
      setComentarioValoracion("");
      setEstrellasValoracion(5);
      setEstadoValoracion((prev) => ({
        ...prev,
        ya_valorado: true,
        puede_valorar: false,
      }));
      await recargarProducto();
    } catch (error) {
      setErrorValoracion(error?.response?.data?.error || "No se pudo enviar la valoracion.");
    } finally {
      setEnviandoValoracion(false);
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
    const token = localStorage.getItem("token");

    if (!token || !id) {
      setEstadoValoracion({
        ha_comprado: false,
        ya_valorado: false,
        puede_valorar: false,
      });
      return;
    }

    getPuedeValorar(id)
      .then((data) => {
        setEstadoValoracion({
          ha_comprado: Boolean(data?.ha_comprado),
          ya_valorado: Boolean(data?.ya_valorado),
          puede_valorar: Boolean(data?.puede_valorar),
        });
      })
      .catch(() => {
        setEstadoValoracion({
          ha_comprado: false,
          ya_valorado: false,
          puede_valorar: false,
        });
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
    cargarEstadoFavorito(id);
  }, [id]);

  useEffect(() => {
    return () => {
      if (avisoTimeoutRef.current) {
        clearTimeout(avisoTimeoutRef.current);
      }
    };
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

  const isLoggedIn = Boolean(localStorage.getItem("token"));
  const valoracion = Math.max(
    0,Math.min(5, Math.round(producto?.valoracion || 0))
  );

  async function alternarFavorito(productoId, token) {
    const res = await fetch("http://127.0.0.1:8000/api/anadir_favorito", {
      method: "POST",
      headers: obtenerHeadersAuth(token),
      body: JSON.stringify({ producto_id: productoId }),
    });

    const { data, raw } = await leerRespuestaApi(res);

    if (!res.ok) {
      throw new Error(data?.error || raw || "Error");
    }
  }

  async function fav(productoId) {
    if (loginRedirect()) return;
    if (actualizandoFavorito) {
      return;
    }

    const token = localStorage.getItem("token");
    setActualizandoFavorito(true);

    try {
      if (esFavorito) {
        const estadoEsperado = false;

        // Actualizamos la UI al instante para que el corazon deje de verse activo.
        setEsFavorito(false);
        setFavoritoRegistroId(null);

        await alternarFavorito(productoId, token);
        const estadoActual = await cargarEstadoFavorito(productoId);

        if (estadoActual !== estadoEsperado) {
          mostrarAviso(t("product.favoriteActionError"), "error");
          return;
        }

        // Evitamos revalidar inmediatamente para no deshacer la UI por latencia de API.
        window.dispatchEvent(
          new CustomEvent("favoritosActualizados", {
            detail: { action: "remove", productoId: Number(productoId) },
          })
        );
        mostrarAviso(t("product.removedFromFavoritesSuccess"), "remove");
      } else {
        const estadoEsperado = true;

        await alternarFavorito(productoId, token);
        const estadoActual = await cargarEstadoFavorito(productoId);

        if (estadoActual !== estadoEsperado) {
          mostrarAviso(t("product.favoriteActionError"), "error");
          return;
        }

        window.dispatchEvent(
          new CustomEvent("favoritosActualizados", {
            detail: { action: "add", productoId: Number(productoId) },
          })
        );
        mostrarAviso(t("product.addedToFavoritesSuccess"), "ok");
      }
    } catch (error) {
      console.error("Error al actualizar favoritos:", error);
      mostrarAviso(t("product.favoriteActionError"), "error");
    } finally {
      setActualizandoFavorito(false);
    }
  }

  function loginRedirect() {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href="/login";
      return;
    }
  }


  
  return (
    <>
      <div className="box">
        <div className="box-img">
          <img src={`http://zent.es/${imgPrincipal}`}alt={producto?.titulo || "Producto"}/>
        </div>

        <div className="imagenes">
            {producto?.do_imagenes?.map((img, index) => (
            <div className="caja-imagen" key={index}>
                <img src={`http://zent.es/${img.url}`}     alt={producto?.titulo || "Producto"} onClick={() => setImgPrincipal(img.url)}   className={imgPrincipal === img.url ? "activa" : ""}  />
            </div>
            ))}
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

              {producto?.do_plataformas?.length > 0 ? (
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
              ) : (
                <span className="sin-plataformas">
                  {t("product.noPlatforms", { defaultValue: "Sin plataformas disponibles" })}
                </span>
              )}
            </div>
          </div>

          <p className="valoracion-estrellas">
              {t("product.ratings")} :
              {Array.from({ length: 5 }, (_, index) => (
                <span key={index}className="estrella">{index < valoracion ? "⭐" : "☆"}   </span>
              ))}
          </p>

          <div className="btn-box">
            <button
              className={`btn-favoritos ${esFavorito ? "activo" : ""}`}
              onClick={() => fav(producto?.id)}
              disabled={actualizandoFavorito}
              aria-label={t("header.nav.favorites")}
              title={t("header.nav.favorites")}
            >
              {esFavorito ? "❤️" : "♡"}
            </button>

            <button 
              className="btn-cesta" 
              onClick={handleAddToCart}
              disabled={!plataformaSeleccionada}
            >
              {t("product.addToCart")}
            </button>
          </div>

          {mensajeAccion ? (
            <p
              className={`mensaje-accion-ok ${
                tipoMensajeAccion === "remove"
                  ? "mensaje-accion-remove"
                  : tipoMensajeAccion === "error"
                    ? "mensaje-accion-error"
                    : ""
              }`}
            >
              {mensajeAccion}
            </p>
          ) : null}
        </div>
      </div>

      <div className="Descripciones">
        <Caracteristicas producto={producto} />
      </div>

      <ValoracionesUsuarios producto={producto} />

{isLoggedIn && estadoValoracion.ha_comprado ? (
  <section className="amazon-review">
    <h3>Valorar este producto</h3>

    {estadoValoracion.puede_valorar ? (
      <>
        {/* ESTRELLAS */}
        <div className="stars">
          {[1, 2, 3, 4, 5].map((num) => (
            <span
              key={num}
              className={num <= estrellasValoracion ? "star active" : "star"}
              onClick={() => setEstrellasValoracion(num)}
            >
              ★
            </span>
          ))}
        </div>

        {/* TEXTO */}
        <textarea
          placeholder="¿Qué te ha parecido este producto?"
          value={comentarioValoracion}
          onChange={(e) => setComentarioValoracion(e.target.value)}
          maxLength={500}
        />

        {/* BOTÓN */}
        <button
          onClick={handleEnviarValoracion}
          disabled={enviandoValoracion}
        >
          {enviandoValoracion ? "Enviando..." : "Enviar opinión"}
        </button>
      </>
    ) : estadoValoracion.ya_valorado ? (
      <p className="info">Ya has enviado tu valoración.</p>
    ) : (
      <p className="info">Solo compradores pueden opinar.</p>
    )}

    {errorValoracion && <p className="error">{errorValoracion}</p>}
    {okValoracion && <p className="ok">{okValoracion}</p>}
  </section>
) : null}

      <Recomendaciones producto={producto} />

      <SeccionProductos titulo={t("product.bestSellers")}  productos={masVendidosFiltrados}  reload={true} />
    </>
  );
}

export default Producto;