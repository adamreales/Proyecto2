import "./ProductoVenta.less";
import { useHeaderCart } from "../../components/Header/Header.js";
function ProductoVenta({ producto, reload = false }) {
    const { cartItems, eliminarProducto } = useHeaderCart(); 
    return (
        <>
        {cartItems.length === 0 ? (
                        <p>Tu carrito está vacío.</p>
                    ) : (
                        <ul>
                            {cartItems.map((item) => {
                                const stockMaximo = Math.max(1, Number(item.stock) || Number(item.cantidad) || 1);
                                const cantidadSeleccionada = Math.min(Number(item.cantidad) || 1, stockMaximo);

                                return (
                                <li key={item.id}>
                                    <div className="item-info">
                                        <div className="bloq1">
                                            <img src={item.imagen} alt={item.nombre} width="50" />
                                            <div className="propeties">
                                                <h3>{item.nombre} </h3> 
                                            </div>
                                        </div>
                                        <div className="blq-acciones">      
                                            <div className="precio">
                                                <p>{item.precio}€</p>
                                                {/* <p>{item.cantidad}</p> */}
                                                <select id="opc" name="opc" defaultValue={cantidadSeleccionada}>
                                                   {[...Array(stockMaximo)].map((_, index) => (
                                                        <option key={index} value={index + 1}>
                                                            {index + 1}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
 
                                            <hr/>

                                            <div className="Gestiones">
                                                <button className="btn-eliminar" onClick={() => eliminarProducto(item.id)}><img src="imagesideas/basura.png" alt="Eliminar" /></button>
                                                <button className="btn-deseos">❤️</button>
                                            </div>
                                        </div>

                                    </div>
                                </li>
                                );
                            })}
                </ul>
            )}
        </>
    );
}

export default ProductoVenta;