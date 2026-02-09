import "./ProductoCard.less";

function ProductoCard({ producto }) {
    return (
        <div className="producto-catalogo">
            <div className="imagen-producto">
                <img
                    src={`http://zent.es/${producto.do_imagenes?.[0]?.url}`}
                    alt={producto.titulo}
                />
            </div>

            <div className="info-producto">
                <h3>{producto.titulo}</h3>
                <p>{producto.precio} €</p>
            </div>
        </div>
    );
}

export default ProductoCard;