import "./Favoritos.css";
import { useEffect, useState } from "react";
import SeccionProductosVideojuegos from "../../components/SeccionProductosVideojuegos/SeccionProductosVideojuegos";
import { useTranslation } from "react-i18next";

function Favoritos() {
  const { t } = useTranslation();
  const [productos, setFavoritos] = useState([]);

  const extraerProducto = (item) => item?.do_producto ?? item?.producto ?? item ?? null;

  const normalizarFavoritos = (items) =>
    (Array.isArray(items) ? items : [])
      .map(extraerProducto)
      .filter((producto) => producto && Number.isFinite(Number(producto.id)));

  const cargarFavoritos = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setFavoritos([]);
      return;
    }

    fetch('http://127.0.0.1:8000/api/productos_favoritos', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
    })
    .then((res)  => res.json())
    .then((data) => setFavoritos(normalizarFavoritos(data?.productos)))
    .catch((err) => console.error(err));
  };

  useEffect(()=> {
    cargarFavoritos();

    const onFavoritosActualizados = (event) => {
      const action = event?.detail?.action;
      const productoId = Number(event?.detail?.productoId);

      if (action === "remove" && Number.isFinite(productoId)) {
        setFavoritos((prev) => prev.filter((producto) => Number(producto?.id) !== productoId));
        return;
      }

      cargarFavoritos();
    };

    window.addEventListener("favoritosActualizados", onFavoritosActualizados);

    return () => {
      window.removeEventListener("favoritosActualizados", onFavoritosActualizados);
    };
  },[]);

  return (
    <>
        
       <div className="pagina-favoritos"> 
         <h2>{t("favorites.title")}</h2>

        {productos.length === 0 && <p>{t("favorites.empty")}</p>}
          <SeccionProductosVideojuegos productos={productos}/>
        </div>

    </>
  );
}
export default Favoritos;