import "./Carrito.css";
import {useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import Producto from "../Producto/Producto";
import ProductoVenta from "../../components/ProductoVenta/ProductoVenta";
import { useHeaderCart } from "../../components/Header/Header";

function Carrito(){
    const {totalPrecio} = useHeaderCart();
    
    return(
        <>
            <h2>Carrito</h2>

            <div className="Carrito">
                <div className="targeta-carrito">
                    <ProductoVenta/>
                </div>
                <div className="target-payment">
                    <p>Precio total: {totalPrecio}€</p>
                </div>
            </div>
        </>
    );
}
export default Carrito;