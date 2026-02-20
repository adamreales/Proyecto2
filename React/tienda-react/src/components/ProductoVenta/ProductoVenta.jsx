import "./ProductoVenta.less";
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
                                          
                                        </div>
                                    </div>
                                    <div className="settings">
                                        <div className="precio">
                                            <p>- Precio unitario : {item.precio}€</p>
                                        </div>
                                        <p>- Cantidad : {item.cantidad}</p>
                                        <hr/>
                                        <div className="Gestiones">
                                            <button className="btn-Eliminar"><img src="imagesideas/basura.png" alt="Eliminar" /></button>
                                            <button className="btn-deseos">Mover a la lista de deseos</button>
                                        </div>
                                    </div>
                                    
                                </li>
                            ))}
                </ul>
            )}
        </>
    );
}

export default ProductoVenta;