import "./ProductoVenta.less";
function ProductoVenta({ cartItems = [], eliminarProducto, actualizarCantidad }) {

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
                                                <p>{item.plataforma}PC</p>
                                            </div>
                                        </div>
                                        <div className="blq-acciones">      
                                            <div className="precio">
                                                <p>{item.precio}€</p>
                                               <div className="contador">
                                                    <button type="button" onClick={() => actualizarCantidad(item.id, cantidadSeleccionada - 1)}>-</button>
                                                    <input type="number" value={cantidadSeleccionada}min="1" max={stockMaximo} onChange={(e) => actualizarCantidad(item.id, Number(e.target.value))}/>
                                                    <button type="button" onClick={() => actualizarCantidad(item.id, cantidadSeleccionada + 1)}>+</button>
                                               </div>
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