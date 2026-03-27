import "./Favoritos.css";
import { useEffect, useState } from "react";
import SeccionProductosVideojuegos from "../../components/SeccionProductosVideojuegos/SeccionProductosVideojuegos";
import { useTranslation } from "react-i18next";

function Favoritos() {
  const { t } = useTranslation();
  const [productos, SetFavoritos] = useState([]);
  const productos_nuevos = [  ];
  useEffect(()=> {
    const token = localStorage.getItem("token");
    fetch('http://127.0.0.1:8000/api/productos_favoritos', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
    })
    .then((res)  => res.json())
    .then((data) => SetFavoritos(data.productos || []))
    .catch((err) => console.error(err));
  },[]);

    productos.forEach((e,i) => {
      productos_nuevos[i] = e.do_producto;
    });
  return (
    <>
        
       <div className="pagina-favoritos"> 
         <h2>{t("favorites.title")}</h2>

         {productos_nuevos.length === 0 && <p>{t("favorites.empty")}</p>}
            <SeccionProductosVideojuegos productos={productos_nuevos}/>
        </div>

    </>
  );
}
export default Favoritos;