import "./Aceptada.css"
import { useMemo } from "react";
import { Link } from "react-router-dom";

function Aceptada() 
{
    const orderNumber = useMemo(() => {
        const params = new URLSearchParams(window.location.search);
        const fromQuery = params.get("pedido") || params.get("pedido_id") || params.get("order") || params.get("orderNumber");
        const fromStorage = localStorage.getItem("ultimoPedidoId");

        return fromQuery || fromStorage || "no disponible";
    }, []);

    return (
        <>
         
            <h1>Compra completada con éxito.</h1>
            <p>Tu pago ha sido procesado correctamente. Gracias por tu compra.</p>
            <p>
                Tu número de pedido es {orderNumber}. Se ha enviado a tu dirección de correo electrónico la factura.
                {orderNumber !== "no disponible" && (
                    <>
                        {" "}
                        También la puedes descargar aquí <Link to={`/factura/${orderNumber}`}>aquí</Link>.
                    </>
                )}
            </p>
           
       </>
    );
}
export default Aceptada;
