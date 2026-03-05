import './TarjetaPago.css';
import { useState } from 'react';

const TarjetaPago = ({ total }) => {

  const [loading,setLoadiong] = useState(false);
  const [error,setError] = useState('');

  const handlePagar = async () => {
    setError('');

    if(total <= 0 || !total){
      setError('El total debe de ser mayor a 0');
      return;
    }
    setLoading(true);

    try{
      const res = await fetch('http://localhost:8000/create-checkout-session',{
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total * 100 })
      });

      const data = await res.json();

      window.location.href = data.url;

    }catch{
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
