import "./Denegada.css";
import { useTranslation } from "react-i18next";

function Denegada() {

  const { t } = useTranslation();

  return (
    <>
      <div className="Denegada">

        <h1>{t("checkout.errorTitle")}</h1>

        <p>{t("checkout.errorMessage")}</p>

        <img
          src="http://zent.es/imagenes_producto/compradenegada.png"
          alt="error"
        />

      </div>
    </>
  );
}

export default Denegada;