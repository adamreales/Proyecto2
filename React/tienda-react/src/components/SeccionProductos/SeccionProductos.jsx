import ProductoCard from "../ProductoCard/ProductoCard";
import "./SeccionProductos.css";
import { useState, useEffect } from "react";

function SeccionProductos({ titulo, productos = [], reload = false }) {
    const [startIndex, setStartIndex] = useState(0);
    const maxitems = 3;

    useEffect(() => {
        setStartIndex(0);
    }, [productos]);

    const visibles = productos.slice(startIndex, startIndex + maxitems);

    const next = () => {
        if (startIndex + maxitems >= productos.length) {
            setStartIndex(0);
        } else {
            setStartIndex(startIndex + maxitems);
        }
    };

    const prev = () => {
        if (startIndex === 0) {
            const lastPage = Math.max(0, productos.length - maxitems);
            setStartIndex(lastPage);
        } else {
            setStartIndex(startIndex - maxitems);
        }
    };

    return (
        <>
            <div className="cabezera">
                <div><h2 className="subtitulo">{titulo}</h2></div>
                 <div className="botones"><button className="btn-prev" onClick={prev} disabled={startIndex === 0}><img src="http://zent.es/imagenes_producto/correrizq.png" className="mario" /></button>
            <button className="btn-next" onClick={next} disabled={startIndex + maxitems >= productos.length}><img src="http://zent.es/imagenes_producto/correr.png" className="mario mario-right" /></button></div>
            </div>
            <div className="box-seccion">    
                <section className="MasVendidos">
                    {visibles.map(p => (
                        <ProductoCard key={p.id} producto={p} reload={reload} />
                    ))}

                </section>
            </div>
        </>
    );
}

export default SeccionProductos;