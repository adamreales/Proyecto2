import './TarjetaPago.css';

const TarjetaPago = ({ total }) => {
  return (
    <>
      {/* <p>Resumen</p> */}
        <section className="tarjeta-pago">
           <div className='box-price'>
             <p className="precio">Total: </p>
             <p className="precio">{total} €</p>
           </div>

            <button className="btn-Pagar">Pagar</button>
        </section>
        <hr />
        <a href="/home" className="url"> Seguir Comprando</a>
    </>
  );
};

export default TarjetaPago;
