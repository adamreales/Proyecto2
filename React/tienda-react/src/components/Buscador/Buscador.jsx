import "./Buscador.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Buscador() {
  const { t } = useTranslation();

  const [texto, setTexto] = useState("");
  const [productos, setProductos] = useState([]);
  const [abierto, setAbierto] = useState(false);
  const rootRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setAbierto(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (texto.trim() === "") {
      setProductos([]);
      setAbierto(false);
      return;
    }

    const timeout = setTimeout(() => {
      buscarProducto();
    }, 300);

    return () => clearTimeout(timeout);
  }, [texto]);

  const buscarProducto = async () => {
    if (texto.trim() === "") return;

    try {
      const response = await fetch("http://127.0.0.1:8000/api/buscador", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ producto_nombre: texto }),
      });

      const data = await response.json();

      if (!response.ok) {
        setProductos([]);
        return;
      }

      if (data.productos) {
        setProductos(data.productos);
        setAbierto(true);
      }
      else console.log(data.error);

    } catch (error) {
      console.error("Error al buscar productos:", error);
    }
  };

  return (
    <div className="buscador-root" ref={rootRef}>

      <div className="buscador-container">
        <input
          type="text"
          className="buscador-input"
          placeholder={t("search.placeholder", {
            defaultValue: "Buscar productos...",
          })}
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onFocus={() => texto.trim() && setAbierto(true)}
        />

        <button className="buscador-btn" onClick={buscarProducto}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>

        <button className="buscador-limpiador" onClick={() => { setTexto(""); setProductos([]); setAbierto(false); }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {abierto && (
        <div className="Resultados">
          {productos.length > 0 ? (
            productos.map((p) => (
              <div
                className="elemento"
                key={p.id}
                onClick={() => {
                  setAbierto(false);
                  navigate(`/producto/${p.id}`);
                }}
              >
                <img
                  src={`http://zent.es/${p.do_imagenes?.[0]?.url}`}
                  alt={p.titulo}
                />

                <div className="elemento-info">
                  <h3>{p.titulo}</h3>
                  <p>
                    {p.do_plataformas
                      ?.map((e) => e.nombre)
                      .join(" | ")}
                  </p>
                </div>

                <span className="elemento-precio">
                  {Number(p.precio).toFixed(2)} €
                </span>
              </div>
            ))
          ) : texto ? (
            <div className="elemento no-resultados-elemento">
              <div className="elemento-info elemento-info-full">
                <h3>{t("search.noResults", {
                  defaultValue: "No se encontraron productos",
                })}</h3>
              </div>
            </div>
          ) : null}
        </div>
      )}

    </div>
  );
}

export default Buscador;