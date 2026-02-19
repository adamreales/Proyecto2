import "./ProductoVenta.less";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHeaderCart } from "../../components/Header/Header";
function ProductoVenta({ producto, reload = false }) {
   const {cartItems,totalItems,totalPrecio} = useHeaderCart(); 

    return (
        <>
        {cartItems.length === 0 ? (
                        <p>Tu carrito está vacío.</p>
                    ) : (
                        <ul>
                            {cartItems.map((item) => (
                                <li key={item.id}>
                                    
                                    <div className="item-info">
                                        <img src={item.imagen} alt={item.nombre} width="50" />
                                        <div className="propeties">
                                            <label>- Nombre : {item.nombre} </label>
                                            <label>- Cantidad: {item.cantidad}</label> 
                                            <label>- Precio: {item.precio}€</label>
                                        </div>
                                    </div>
                                    <div className="setings">
                                        <p>X</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
            )}
        </>
    );
}

export default ProductoVenta;