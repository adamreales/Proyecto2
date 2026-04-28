import "./Carrito.css";
import ProductoVenta from "../../components/ProductoVenta/ProductoVenta";
import { useHeaderCart } from "../../components/Header/Header";
import TarjetaPago from "../../components/TarjetaPago/TarjetaPago";
import { useTranslation } from "react-i18next";

function Carrito(){
    const { cartItems, totalPrecio, eliminarProducto, actualizarCantidad } = useHeaderCart();
    const { t } = useTranslation();
    
    return(
        <>
            <div className="Titulos"> 
                 <h2>{t("cart.title")}</h2>
            </div>
            <div className="Carrito">
                <div className="targeta-carrito">
                    <ProductoVenta cartItems={cartItems} eliminarProducto={eliminarProducto} actualizarCantidad={actualizarCantidad}/>
                </div>
               
                <div className="target-payment"> 
                   <TarjetaPago total={totalPrecio}></TarjetaPago> 
                </div>
            </div>
        </>
    );
}
export default Carrito;