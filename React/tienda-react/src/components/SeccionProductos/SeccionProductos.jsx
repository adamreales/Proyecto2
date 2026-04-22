import ProductoCard from "../ProductoCard/ProductoCard";
import "./SeccionProductos.css";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function SeccionProductos({ titulo, productos = [], reload = false }) {
  const { t } = useTranslation();

  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3); // ✅ FALTABA

  // reset cuando cambian productos
  useEffect(() => {
    setStartIndex(0);
  }, [productos]);

  // responsive
  useEffect(() => {
    const updateItems = () => {
      if (window.innerWidth <= 768) {
        setItemsPerView(1);
      } else if (window.innerWidth <= 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItems();

    window.addEventListener("resize", updateItems);
    return () => window.removeEventListener("resize", updateItems);
  }, []);

  // evitar bugs al cambiar tamaño
  useEffect(() => {
    setStartIndex(0);
  }, [itemsPerView]);

  // ✅ BIEN USADO
  const visibles = productos.slice(startIndex, startIndex + itemsPerView);

  const next = () => {
    if (startIndex + itemsPerView >= productos.length) {
      setStartIndex(0);
    } else {
      setStartIndex(startIndex + itemsPerView);
    }
  };

  const prev = () => {
    if (startIndex === 0) {
      const lastPage = Math.max(0, productos.length - itemsPerView);
      setStartIndex(lastPage);
    } else {
      setStartIndex(startIndex - itemsPerView);
    }
  };

  return (
    <>
      <div className="cabezera">
        <div>
          <h2 className="subtitulo">{titulo}</h2>
        </div>

        <div className="botones">
          <button
            className="btn-prev"
            onClick={prev}
            disabled={startIndex === 0}
          >
            <img src="http://zent.es/imagenes_producto/correrizq.png" className="mario" alt={t("common.previous")} />
          </button>

          <button
            className="btn-next"
            onClick={next}
            disabled={startIndex + itemsPerView >= productos.length}
          >
            <img src="http://zent.es/imagenes_producto/correr.png" className="mario" alt={t("common.next")} />
          </button>
        </div>
      </div>

      <div className="box-seccion">
        <section className="MasVendidos">
          {visibles.map((p) => (
            <ProductoCard key={p.id} producto={p} reload={reload} />
          ))}
        </section>
      </div>
    </>
  );
}

export default SeccionProductos;