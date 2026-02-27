import "./Carrito.css";
import {useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import Producto from "../Producto/Producto";
import ProductoVenta from "../../components/ProductoVenta/ProductoVenta";
import { useHeaderCart } from "../../components/Header/Header";
import TarjetaPago from "../../components/TarjetaPago/TarjetaPago";

function Carrito(){
    const { cartItems, totalPrecio, eliminarProducto, actualizarCantidad } = useHeaderCart();
    
    return(
        <>
            <div className="Titulos"> 
                 <h2>Carrito</h2>
            </div>
            <div className="Carrito">
                <div className="targeta-carrito">
                    <ProductoVenta
                        cartItems={cartItems}
                        eliminarProducto={eliminarProducto}
                        actualizarCantidad={actualizarCantidad}
                    />
                </div>
               
                <div className="target-payment"> 
                   <TarjetaPago total={totalPrecio}></TarjetaPago> 
                </div>
            </div>
        </>
    );
}
export default Carrito;