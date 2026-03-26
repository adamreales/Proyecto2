import "./Caracteristicas.css";
import { useTranslation } from "react-i18next";

function Caracteristicas({ producto }) {
  const { t } = useTranslation();

  return (
    <div className="card-info">
      <h2>{t("features.title")}</h2>

      <div className="Especificado">

        <div className="box-informacion">
          <img src="http://zent.es/imagenes_producto/modo.png"/>
          <strong>{t("features.genre")}:</strong>{" "}
          {producto.do_juego?.genero || t("features.defaultGenre")}
        </div>

        <div className="box-informacion">
          <img src="http://zent.es/imagenes_producto/genero.png"/>
          <strong>{t("features.mode")}:</strong>{" "}
          {t("features.modeValue")}
        </div>

        <div className="box-informacion">
          <img src="http://zent.es/imagenes_producto/plataformas.png"/>
          <strong>{t("features.platforms")}:</strong>{" "}
          {producto.do_plataformas?.length > 0
            ? producto.do_plataformas.map((p) => p.nombre).join(", ")
            : t("common.notAvailable")}
        </div>

        <div className="box-informacion">
          <img src="http://zent.es/imagenes_producto/Lanzamiento.png"/>
          <strong>{t("features.rating")}:</strong>{" "}
          {producto.valoracion || t("common.notAvailable")} / 5
        </div>

        <div className="box-informacion">
          <img src="http://zent.es/imagenes_producto/Idiomas.jpg"/>
          <strong>{t("features.languages")}:</strong>{" "}
          {t("features.languagesValue")}
        </div>

      </div>
    </div>
  );
}

export default Caracteristicas;