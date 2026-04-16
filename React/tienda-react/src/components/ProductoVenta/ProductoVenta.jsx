import "./ProductoVenta.less";
import { useTranslation } from "react-i18next";

function ProductoVenta({ cartItems = [], eliminarProducto, actualizarCantidad }) {
  const { t, i18n } = useTranslation();

  // ✅ Formateador de moneda reutilizable
  const formatPrice = (precio) =>
    new Intl.NumberFormat(i18n.language, {
      style: "currency",
      currency: "EUR",
    }).format(precio);

  return (
    <>
      {cartItems.length === 0 ? (
        <p>{t("cart.empty")}</p>
      ) : (
        <ul>
          {cartItems.map((item) => {
            const stockMaximo = Math.min(10, Math.max(1, Number(item.stock) || 1));
            const cantidadSeleccionada = Math.min(
              Math.max(1, Number(item.cantidad) || 1),
              stockMaximo
            );

            return (
              <li key={item.id}>
                <div className="item-info">

                  <div className="bloq1">
                    <img src={item.imagen} alt={item.nombre} width="50" />

                    <div className="propeties">
                      <h3>{item.nombre}</h3>
                      <p> {item.plataforma || "PC"} </p>
                    </div>
                  </div>
                     <p>{formatPrice(item.precio)}</p>
                  <div className="blq-acciones">

                    <div className="precio">
                      <div className="contador">
                        <button type="button" onClick={() => actualizarCantidad(item, cantidadSeleccionada - 1)} disabled={cantidadSeleccionada <= 1}>-</button>

                        <input type="number" value={cantidadSeleccionada} min="1" max={stockMaximo} onChange={(e) => { const val = Math.min(10, Math.max(1, Number(e.target.value) || 1)); actualizarCantidad(item, val); }}/>

                        <button type="button" onClick={() => actualizarCantidad(item, cantidadSeleccionada + 1)} disabled={cantidadSeleccionada >= stockMaximo}>+</button>
                      </div>
                    </div>
                    <div className="Gestiones">
                      <button className="btn-eliminar" onClick={() => eliminarProducto(item)} >Eliminar </button>
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