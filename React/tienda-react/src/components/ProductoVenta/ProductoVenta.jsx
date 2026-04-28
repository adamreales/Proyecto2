import "./ProductoVenta.less";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Link } from "react-router-dom";

function ProductoVenta({ cartItems = [], eliminarProducto, actualizarCantidad }) {
  const { t, i18n } = useTranslation();
    const [loadingIds, setLoadingIds] = useState([]);

  // ✅ Formateador de moneda reutilizable
  const formatPrice = (precio) =>
    new Intl.NumberFormat(i18n.language, {
      style: "currency",
      currency: "EUR",
    }).format(precio);

    const handleUpdate = async (item, nuevaCantidad) => {
    if (loadingIds.includes(item.id)) return; // 🚫 evita spam

    setLoadingIds((prev) => [...prev, item.id]);

    try {
        await actualizarCantidad(item, nuevaCantidad);
    } finally {
        setLoadingIds((prev) => prev.filter((id) => id !== item.id));
    }
    };

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
            console.info(item);
            return (
              <li key={item.id_producto}>
                <div className="item-info">

                <Link to={`/producto/${item.idProducto}`}>
                    <img className="img-producto" src={item.imagen} alt={item.nombre} />
                </Link>
                <div className="propeties">
                    <h3>
                        <Link to={`/producto/${item.idProducto}`}>
                            {item.nombre}
                        </Link>
                    </h3>
                    <p>{item.plataforma || "PC"}</p>
                </div>
                     <p>{formatPrice(item.precio)}</p>
                  <div className="blq-acciones">

                    <div className="precio">
                      <div className="contador">
                        <button
                        type="button"
                        onClick={() => handleUpdate(item, cantidadSeleccionada - 1)}
                        disabled={cantidadSeleccionada <= 1 || loadingIds.includes(item.id)}
                        >
                        -
                        </button>

                        <input
                        type="number"
                        value={cantidadSeleccionada}
                        min="1"
                        max={stockMaximo}
                        readOnly
                        disabled={loadingIds.includes(item.id)}
                        />

                        <button
                        type="button"
                        onClick={() => handleUpdate(item, cantidadSeleccionada + 1)}
                        disabled={cantidadSeleccionada >= stockMaximo || loadingIds.includes(item.id)}
                        >
                        +
                        </button>
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