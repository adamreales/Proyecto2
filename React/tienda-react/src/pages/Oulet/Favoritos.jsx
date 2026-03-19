import "./Favoritos.css";
import { useTranslation } from "react-i18next";

function Favoritos() {
  const { t } = useTranslation();

  return (
    <>
       <div className="pagina-favoritos"> 
         <h2>{t("favorites.title")}</h2>

         <p>{t("favorites.empty")}</p>

        </div>

    </>
  );
}
export default Favoritos;