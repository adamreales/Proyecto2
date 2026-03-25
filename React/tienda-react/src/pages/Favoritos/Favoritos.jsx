import "./Favoritos.css";
import { useEffect, useState } from "react";
import SeccionProductosVideojuegos from "../../components/SeccionProductosVideojuegos/SeccionProductosVideojuegos";
import { useTranslation } from "react-i18next";

function Favoritos() {
  const { t } = useTranslation();
  const [productos, SetFavoritos] = useState([]);
  
  useEffect(()=> {
    let sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem("sessionId", sessionId);
    }

    fetch('http://127.0.0.1:8000/api/productos_favoritos', {
      headers: {
        "Content-Type": "application/json",
        "X-Session-Id": sessionId,
      },
    })
    .then((res)  => res.json())
    .then((data) => SetFavoritos(data.productos || []))
    .catch((err) => console.error(err));
  },[]);
  return (
    <>
        
       <div className="pagina-favoritos"> 
         <h2>{t("favorites.title")}</h2>

         <p>{t("favorites.empty")}</p>
            <SeccionProductosVideojuegos productos={productos}/>
        </div>

    </>
  );
}
export default Favoritos;