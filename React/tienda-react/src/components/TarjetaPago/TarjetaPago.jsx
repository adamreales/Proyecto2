import './TarjetaPago.css';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const TarjetaPago = ({ total }) => {

  const { t, i18n } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getSessionId = () => {
    let sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem("sessionId", sessionId);
    }
    return sessionId;
  };

  // ✅ Formateador de moneda
  const formatPrice = (precio) =>
    new Intl.NumberFormat(i18n.language, {
      style: "currency",
      currency: "EUR",
    }).format(precio);

  const handlePagar = async () => {
    setError('');

    if (total <= 0 || !total) {
      setError(t("payment.totalMustBeGreaterThanZero"));
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const sessionId = getSessionId();
      const headers = {
        "Content-Type": "application/json",
        "X-Session-Id": sessionId,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      // Paso 1: crear pedido
      const resPedido = await fetch('http://localhost:8000/api/preparar_pago', {
        method: 'POST',
        headers
      });

      const dataPedido = await resPedido.json();

      if (!resPedido.ok || !dataPedido.pedido_id) {
        console.error("Error al crear pedido:", dataPedido);
        setError(dataPedido.error || t("payment.createOrderError"));
        setLoading(false);
        return;
      }

      // Paso 2: Stripe
      const resPago = await fetch(`http://localhost:8000/api/pagar_pedido/${dataPedido.pedido_id}`, {
        method: 'POST',
        headers
      });

      const dataPago = await resPago.json();

      if (!resPago.ok || !dataPago.checkout_url) {
        console.error("Stripe no devolvió URL:", dataPago);
        setError(dataPago.error || t("payment.paymentStartError"));
        setLoading(false);
        return;
      }

      localStorage.setItem("ultimoPedidoId", String(dataPedido.pedido_id));

      window.location.href = dataPago.checkout_url;

    } catch (error) {
      console.error("Error al procesar el pago:", error);
      setError(t("payment.processPaymentError"));
      setLoading(false);
    }
  };

  return (
    <>
      <section className="tarjeta-pago">

        <div className='box-price'>
          <p className="precio">{t("payment.total")}:</p>
          <p className="precio">{formatPrice(total)}</p>
        </div>
        <div className='Correo'>
          <p>Direccion de Envio : </p>
          <input type ="text" placeholder="Escribe tu email para enviar el producto" className='input'></input>
        </div>
        <button  className="btn-Pagar"onClick={handlePagar}  disabled={loading}>{loading ? t("payment.redirecting") : t("payment.pay")}</button>

        {error && <p className='error-pago'>{error}</p>}

      </section>

      <a href="/home" className="url">{t("cart.continueShopping")} </a>
    </>
  );
};

export default TarjetaPago;