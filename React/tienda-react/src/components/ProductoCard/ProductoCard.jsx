import "./ProductoCard.less";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ProductoCard({ producto, reload = false }) {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const handleClick = () => {
    if (reload) {
      window.location.href = `/producto/${producto.id}`;
    } else {
      navigate(`/producto/${producto.id}`);
    }
  };

  // ✅ Formato de precio internacional
  const precioFormateado = new Intl.NumberFormat(i18n.language, {
    style: "currency",
    currency: "EUR",
  }).format(producto.precio);

  return (
    <div className="producto-catalogo">
      
      <div 
        className="imagen-producto" 
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      >
        <img
          src={`http://zent.es/${producto.do_imagenes?.[0]?.url}`}
          alt={producto.titulo}
        />
      </div>

      <div className="info-producto">
        <h3>{producto.titulo} </h3>
        <p>{precioFormateado}</p>
      </div>

    </div>
  );
}

export default ProductoCard;