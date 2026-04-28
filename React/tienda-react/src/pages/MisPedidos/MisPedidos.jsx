import "./MisPedidos.css";
import { useEffect, useState } from "react";
import { getFacturas, descargarFacturaPdf } from "../../services/facturas";
import { useTranslation } from "react-i18next";

function MisPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [descargandoId, setDescargandoId] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    getFacturas()
      .then((list) => {
        setPedidos(Array.isArray(list) ? list : []);
      })
      .catch(() => {
        setError(t("orders.loadError"));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [t]);

  const handleDescargar = async (facturaId) => {
    setDescargandoId(facturaId);
    try {
      await descargarFacturaPdf(facturaId);
    } catch {
      setError(t("orders.downloadError"));
    } finally {
      setDescargandoId(null);
    }
  };

  if (loading) {
    return <p className="mis-pedidos-status">{t("orders.loading")}</p>;
  }

  return (
    <section className="mis-pedidos-page">
      <h1>{t("orders.title")}</h1>

      {error && <p className="mis-pedidos-error">{error}</p>}

      {pedidos.length === 0 ? (
        <p className="mis-pedidos-status">{t("orders.empty")}</p>
      ) : (
        <div className="mis-pedidos-list">
          {pedidos.map((pedido) => (
            <article className="mis-pedidos-item" key={pedido.id}>
              <p><b>{t("profile.orderLabel")}:</b> #{pedido.id_pedido ?? pedido.id}</p>
              <p><b>{t("profile.invoiceLabel")}:</b> {pedido.numero_factura ?? t("profile.noNumber")}</p>
              <p><b>{t("profile.totalLabel")}:</b> {Number(pedido.total ?? 0).toFixed(2)} EUR</p>
              <button
                type="button"
                className="mis-pedidos-btn"
                onClick={() => handleDescargar(pedido.id)}
                disabled={descargandoId === pedido.id}
              >
                {descargandoId === pedido.id ? t("orders.downloading") : t("profile.downloadInvoice")}
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default MisPedidos;
