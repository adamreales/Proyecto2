import ProductoCard from "../ProductoCard/ProductoCard";
import "./SeccionProductos.css";
function SeccionProductos({ titulo, productos, reload = false }) {
    return (
        <>
            <h2 className="subtitulo">{titulo}</h2>

            <section className="MasVendidos">
                {productos.slice(0, 3).map(p => (
                    <ProductoCard key={p.id} producto={p} reload={reload} />
                ))}
            </section>
        </>
    );
}

export default SeccionProductos;