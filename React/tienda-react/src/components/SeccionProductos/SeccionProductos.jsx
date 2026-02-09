import ProductoCard from "../ProductoCard/ProductoCard";

function SeccionProductos({ titulo, productos }) {
    return (
        <>
            <h2 className="subtitulo">{titulo}</h2>

            <section className="MasVendidos">
                {productos.slice(0, 3).map(p => (
                    <ProductoCard key={p.id} producto={p} />
                ))}
            </section>
        </>
    );
}

export default SeccionProductos;