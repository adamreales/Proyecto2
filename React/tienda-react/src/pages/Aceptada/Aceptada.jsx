import "./Aceptada.css";
import { useMemo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getFacturas, descargarFacturaPdf } from "../../services/facturas";

function Aceptada() {

  const { t } = useTranslation();
  const successTitle = t("checkout.successTitle", { defaultValue: "Compra realizada exitosamente." });

  const isLoggedIn = Boolean(localStorage.getItem("token"));

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

  const [factura, setFactura] = useState(null);
  const [descargando, setDescargando] = useState(false);
  const [errorDescarga, setErrorDescarga] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) return;

    getFacturas()
      .then((list) => {
        if (list && list.length > 0) {
          setFactura(list[0]);
        }
      })
      .catch(() => {});
  }, [isLoggedIn]);

  const handleDescargar = async () => {
    if (!factura) return;
    setDescargando(true);
    setErrorDescarga(null);
    try {
      await descargarFacturaPdf(factura.id);
    } catch {
      setErrorDescarga(t("checkout.downloadError"));
    } finally {
      setDescargando(false);
    }
  };

  return (
    <>
      <div className="Acceptada">

        <h1>{successTitle === "checkout.successTitle" ? "Compra realizada exitosamente." : successTitle}</h1>

        <p>{t("checkout.successMessage")}</p>

        <p>
          {t("checkout.orderNumber", { orderNumber })}
        </p>

        {isLoggedIn && factura && (
          <div className="Acceptada__factura">
            <p>{t("checkout.invoiceReady")}</p>
            <button
              className="Acceptada__download-btn"
              onClick={handleDescargar}
              disabled={descargando}
            >
              {descargando
                ? t("checkout.downloadingInvoice")
                : t("checkout.downloadInvoice")}
            </button>
            {errorDescarga && (
              <p className="Acceptada__error">{errorDescarga}</p>
            )}
          </div>
        )}

        <img src="http://zent.es/imagenes_producto/compraaceptada.jpg" alt="success" />

      </div>
    </>
  );
}

export default Aceptada;