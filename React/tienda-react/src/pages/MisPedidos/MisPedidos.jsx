import "./MisPedidos.css";
import { useEffect, useState } from "react";
import { getFacturas, descargarFacturaPdf } from "../../services/facturas";

function MisPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [descargandoId, setDescargandoId] = useState(null);

  useEffect(() => {
    getFacturas()
      .then((list) => {
        setPedidos(Array.isArray(list) ? list : []);
      })
      .catch(() => {
        setError("No se pudieron cargar tus pedidos.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDescargar = async (facturaId) => {
    setDescargandoId(facturaId);
    try {
      await descargarFacturaPdf(facturaId);
    } catch {
      setError("No se pudo descargar la factura.");
    } finally {
      setDescargandoId(null);
    }
  };

  if (loading) {
    return <p className="mis-pedidos-status">Cargando pedidos...</p>;
  }

  return (
    <section className="mis-pedidos-page">
      <h1>Mis Pedidos</h1>

      {error && <p className="mis-pedidos-error">{error}</p>}

      {pedidos.length === 0 ? (
        <p className="mis-pedidos-status">Todavia no tienes pedidos.</p>
      ) : (
        <div className="mis-pedidos-list">
          {pedidos.map((pedido) => (
            <article className="mis-pedidos-item" key={pedido.id}>
              <p><b>Pedido:</b> #{pedido.id_pedido ?? pedido.id}</p>
              <p><b>Factura:</b> {pedido.numero_factura ?? "Sin numero"}</p>
              <p><b>Total:</b> {Number(pedido.total ?? 0).toFixed(2)} EUR</p>
              <button
                type="button"
                className="mis-pedidos-btn"
                onClick={() => handleDescargar(pedido.id)}
                disabled={descargandoId === pedido.id}
              >
                {descargandoId === pedido.id ? "Descargando..." : "Descargar factura"}
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default MisPedidos;
