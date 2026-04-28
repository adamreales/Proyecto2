import "./MisOpiniones.css";
import { useEffect, useState } from "react";
import { getMisValoraciones } from "../../services/valoraciones";
import { useTranslation } from "react-i18next";

function MisOpiniones() {
  const [opiniones, setOpiniones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    getMisValoraciones()
      .then((data) => {
        setOpiniones(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        setError(t("opinions.loadError"));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [t]);

  if (loading) {
    return <p className="mis-opiniones-status">{t("opinions.loading")}</p>;
  }

  return (
    <section className="mis-opiniones-page">
      <h1>{t("opinions.title")}</h1>

      {error && <p className="mis-opiniones-error">{error}</p>}

      {opiniones.length === 0 ? (
        <p className="mis-opiniones-status">{t("opinions.empty")}</p>
      ) : (
        <div className="mis-opiniones-list">
          {opiniones.map((opinion) => (
            <article className="mis-opiniones-item" key={opinion.id}>
              <div className="mis-opiniones-summary">
                {opinion.producto_imagen ? (
                  <img src={`http://zent.es/${opinion.producto_imagen}`} alt={opinion.producto_titulo || t("profile.productFallback")} />
                ) : null}

                <div className="mis-opiniones-summary-text">
                  <p><b>{t("profile.productLabel")}:</b> {opinion.producto_titulo || t("profile.productFallback")}</p>
                  <p><b>{t("profile.ratingLabel")}:</b> {"⭐".repeat(opinion.estrellas || 0)}</p>
                  <p><b>{t("profile.commentLabel")}:</b> {opinion.comentario || t("profile.noComment")}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default MisOpiniones;
