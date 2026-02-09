import ProductoCard from "../ProductoCard/ProductoCard";
import "./SeccionProductosVideojuegos.css";

function SeccionProductosVideojuegos({ titulo, productos }) {
    return (
        <div className="seccion-videojuegos">
            <h2 className="titulo-seccion">{titulo}</h2>

            <div className="grid-productos">
                {productos.map(p => (
                    <ProductoCard key={p.id} producto={p} />
                ))}
            </div>
        </div>
    );
}

export default SeccionProductosVideojuegos;