import "./Recomendaciones.css";
import { useTranslation } from "react-i18next";

function Recomendaciones() {
  const { t } = useTranslation();

  return (
    <div className="Recomendaciones">
      <h2>{t("recommendations.title")}</h2>

      <div className="contenido">
        <div className="Atencion">
          <img src="http://zent.es/imagenes_producto/Atencion.png"/>
        </div>

        <div className="informacion">
          <p>{t("recommendations.text")}</p>
        </div>
      </div>
    </div>
  );
}

export default Recomendaciones;