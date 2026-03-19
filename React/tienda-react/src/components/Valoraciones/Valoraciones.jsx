import "./Valoraciones.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Valoraciones() {
  const { t } = useTranslation();

  return (
    <>
      <h2>{t("reviews.title")}</h2>

      <div className="Valoraciones">

        <div className="imagenfundador">
          <img src="http://zent.es/imagenes_producto/Faker.png" alt="review" />
        </div>

        <div className="BloqueInformativo">

          <div className="Estrellas">
            <p>⭐⭐⭐⭐⭐</p>
          </div>

          <div className="Informacion">
            <p>{t("reviews.summary")}</p>
          </div>

          <Link to="/conocenos"><button className="BotonValoraciones"> {t("reviews.feedbacks")}</button></Link>

        </div>

      </div>
    </>
  );
}

export default Valoraciones;