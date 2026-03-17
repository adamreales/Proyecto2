import './TarjetaPago.css';
import { useState } from 'react';

const TarjetaPago = ({ total }) => {

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState('');

  const handlePagar = async () => {
    setError('');

    if(total <= 0 || !total){
      setError('El total debe de ser mayor a 0');
      return;
    }
    setLoading(true);

    try{
      // Paso 1: crear el pedido
      const resPedido = await fetch('http://localhost:8000/api/preparar_pago',{
        method : 'POST',
        headers: {
          "Content-Type": "application/json",
          "X-Session-Id": localStorage.getItem("sessionId")
        }
      });
      const dataPedido = await resPedido.json();

      if (!resPedido.ok || !dataPedido.pedido_id) {
        console.error("Error al crear pedido:", dataPedido);
        setError(dataPedido.error || "No se pudo crear el pedido");
        setLoading(false);
        return;
      }

      // Paso 2: crear sesión de Stripe y obtener URL de pago
      const resPago = await fetch(`http://localhost:8000/api/pagar_pedido/${dataPedido.pedido_id}`,{
        method : 'POST',
        headers: {
          "Content-Type": "application/json",
          "X-Session-Id": localStorage.getItem("sessionId")
        }
      });
      const dataPago = await resPago.json();

      if (!resPago.ok || !dataPago.checkout_url) {
        console.error("Stripe no devolvió URL:", dataPago);
        setError(dataPago.error || "No se pudo iniciar el pago");
        setLoading(false);
        return;
      }

      // Conserva el último pedido para mostrarlo al volver de Stripe.
      localStorage.setItem("ultimoPedidoId", String(dataPedido.pedido_id));

      window.location.href = dataPago.checkout_url;

    }catch(error){
      console.error("Error al procesar el pago:", error);
      console.log("total" + total);
      setError('Error al procesar el pago');
      setLoading(false);
    }
  }
  return (
    <>
      {/* <p>Resumen</p> */}
        <section className="tarjeta-pago">
           <div className='box-price'>
             <p className="precio">Total: </p>
             <p className="precio">{total} €</p>
             
           </div>

            <button className="btn-Pagar" onClick={handlePagar} disabled={loading}>
              {loading ? "Redirigiendo..." : "Pagar"}
            </button>
            {error && <p className='error-pago'>{error}</p>}

        </section>
        <hr />
        <a href="/home" className="url"> Seguir Comprando</a>
    </>
  );
};

export default TarjetaPago;
