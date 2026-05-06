import "./Videojuegos.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SeccionProductosVideojuegos from "../../components/SeccionProductosVideojuegos/SeccionProductosVideojuegos";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

function Videojuegos() {
  const { t } = useTranslation();

  const LIMIT = 12;

  const [productos, setProductos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [categoria, setCategoria] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [orden, setOrden] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [plataformas, setPlataformas] = useState([]);
  const [hayMas, setHayMas] = useState(true); // 👈 nuevo

  const ordenEspecial =
    orden === "productos_mas_baratos" ||
    orden === "productos_mas_alfabeticamente" ||
    orden === "productos_menos_alfabeticamente" ||
    orden === "productos_mas_caros";

  const next = () => {
    if (hayMas) {
      setPagina((prevPagina) => prevPagina + 1);
    }
  };

  const prev = () => {
    if (pagina > 1) {
      setPagina((prevPagina) => prevPagina - 1);
    }
  };

  useEffect(() => {
    let url = `http://127.0.0.1:8000/api/productos?page=${pagina}&limit=${LIMIT}`;

    if (categoria) {
      url = `http://127.0.0.1:8000/api/productos_categoria/${categoria}?page=${pagina}&limit=${LIMIT}`;
    } else if (plataforma) {
      url = `http://127.0.0.1:8000/api/productos_plataforma/${plataforma}?page=${pagina}&limit=${LIMIT}`;
    } else if (ordenEspecial) {
      url = `http://127.0.0.1:8000/api/${orden}?page=${pagina}&limit=${LIMIT}`;
    }

    if (orden && !ordenEspecial) {
      url += `&orden=${orden}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const lista = Array.isArray(data.productos)
          ? data.productos
          : Array.isArray(data.producto)
            ? data.producto
            : Array.isArray(data.producto?.data)
              ? data.producto.data
              : [];
        setProductos(lista);

        // Algunos endpoints devuelven hasMore y otros el paginador completo.
        setHayMas(Boolean(data.hasMore ?? data.producto?.next_page_url));
      })
      .catch((err) => {
        console.error(err);
        setProductos([]);
        setHayMas(false);
      });
  }, [pagina, categoria, plataforma, orden]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/categorias`)
      .then((res) => res.json())
      .then((data) => setCategorias(data.categorias || []))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/plataformas`)
      .then((res) => res.json())
      .then((data) => setPlataformas(data.plataformas || []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <ScrollToTop trigger={pagina} />

      <div className="VideoJuegos">
        <h2>{t("videogames.title")}</h2>

        <div className="Filtros">
          <div className="Filtros_boton">
            <button
              className={`btn-filtros ${orden === "productos_mas_caros" ? "activo" : ""}`}
              onClick={() => { setOrden("productos_mas_caros"); setPagina(1); }}
            >
              {t("videogames.priceAsc")}
            </button>

            <button
              className={`btn-filtros ${orden === "productos_mas_baratos" ? "activo" : ""}`}
              onClick={() => { setOrden("productos_mas_baratos"); setPagina(1); }}
            >
              {t("videogames.priceDesc")}
            </button>

            <button
              className={`btn-filtros ${orden === "productos_mas_alfabeticamente" ? "activo" : ""}`}
              onClick={() => { setOrden("productos_mas_alfabeticamente"); setPagina(1); }}
            >
              {t("videogames.alphaAsc")}
            </button>

            <button
              className={`btn-filtros ${orden === "productos_menos_alfabeticamente" ? "activo" : ""}`}
              onClick={() => { setOrden("productos_menos_alfabeticamente"); setPagina(1); }}
            >
              {t("videogames.alphaDesc")}
            </button>
          </div>

          <div className="Filtros_select">
            <select
              className="select"
              value={categoria}
              onChange={(e) => {
                setCategoria(e.target.value);
                setPlataforma("");
                setPagina(1);
              }}
            >
              <option value="">{t("videogames.categories")}</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </select>

            <select
              className="select"
              value={plataforma}
              onChange={(e) => {
                setPlataforma(e.target.value);
                setCategoria("");
                setPagina(1);
              }}
            >
              <option value="">{t("videogames.platforms")}</option>
              {plataformas.map((plataforma) => (
                <option key={plataforma.id} value={plataforma.id}>
                  {plataforma.nombre}
                </option>
              ))}
            </select>

            <button
              className="btn-filtros"
              onClick={() => {
                setCategoria("");
                setPlataforma("");
                setOrden("");
                setPagina(1);
              }}
            >
              Quitar Filtro
            </button>
          </div>
        </div>

        <div className="Productos">
          <SeccionProductosVideojuegos productos={productos} />
        </div>

        <div className="cabezera">
          <h3 className="pagina-actual">
            {t("videogames.page")} {pagina}
          </h3>

          <div className="botones">
            <button
              className="btn-prev"
              onClick={prev}
              disabled={pagina === 1 || ordenEspecial}
            >
              <img
                src="http://zent.es/imagenes_producto/flecha_izquierda.png"
                className="mario"
                alt={t("common.previous")}
              />
            </button>

            <button
              className="btn-next"
              onClick={next}
              disabled={!hayMas}
            >
              <img
                src="http://zent.es/imagenes_producto/flecha_derecha.png"
                className="mario mario-right"
                alt={t("common.next")}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Videojuegos;