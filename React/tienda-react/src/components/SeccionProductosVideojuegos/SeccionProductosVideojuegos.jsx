import ProductoCard from "../ProductoCard/ProductoCard";
import "./SeccionProductosVideojuegos.css";

function SeccionProductosVideojuegos({ titulo, productos }) {
    const productosValidos = (Array.isArray(productos) ? productos : []).filter(
        (p) => p && Number.isFinite(Number(p.id))
    );

    return (
        <div className="seccion-videojuegos">
            <h2 className="titulo-seccion">{titulo}</h2>

            <div className="grid-productos">
                {productosValidos.map((p) => (
                    <ProductoCard key={p.id} producto={p} />
                ))}
            </div>
        </div>
    );
}

export default SeccionProductosVideojuegos;