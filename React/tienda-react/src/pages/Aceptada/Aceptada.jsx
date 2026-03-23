import "./Aceptada.css";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Aceptada() {

  const { t } = useTranslation();
  const successTitle = t("checkout.successTitle", { defaultValue: "Compra realizada exitosamente." });

  const orderNumber = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const fromQuery =
      params.get("pedido") ||
      params.get("pedido_id") ||
      params.get("order") ||
      params.get("orderNumber");

    const fromStorage = localStorage.getItem("ultimoPedidoId");

    return fromQuery || fromStorage || t("checkout.unavailable");
  }, [t]);

  return (
    <>
      <div className="Acceptada">

        <h1>{successTitle === "checkout.successTitle" ? "Compra realizada exitosamente." : successTitle}</h1>

        <p>{t("checkout.successMessage")}</p>

        <p>
          {t("checkout.orderNumber", { orderNumber })}

          {orderNumber !== t("checkout.unavailable") && (
            <>
              {" "}
              {t("checkout.downloadHere")}{" "}
              <Link to={`/factura/${orderNumber}`}>
                {t("checkout.downloadHere")}
              </Link>
              .
            </>
          )}
        </p>

        <img src="http://zent.es/imagenes_producto/compraaceptada.jpg" alt="success" />

      </div>
    </>
  );
}

export default Aceptada;