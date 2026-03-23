import "./Denegada.css";
import { useTranslation } from "react-i18next";

function Denegada() {

  const { t } = useTranslation();
  const errorTitle = t("checkout.errorTitle", { defaultValue: "Compra denegada" });

  return (
    <>
      <div className="Denegada">

        <h1>{errorTitle === "checkout.errorTitle" ? "Compra denegada" : errorTitle}</h1>

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