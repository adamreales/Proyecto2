import "./Videojuegos.css";
import { useEffect, useMemo, useState } from "react";
import SeccionProductosVideojuegos from "../../components/SeccionProductosVideojuegos/SeccionProductosVideojuegos";
import { filtrarYOrdenarVideojuegos, GENEROS } from "./videojuegosFilters";

function Videojuegos()
{
    const [productos, setProductos] = useState([]);
    const [generoSeleccionado, setGeneroSeleccionado] = useState(null);
    const [precioMin, setPrecioMin] = useState("");
    const [precioMax, setPrecioMax] = useState("");
    const [ordenPrecio, setOrdenPrecio] = useState("ninguno");

    const productosFiltrados = useMemo(() =>
        filtrarYOrdenarVideojuegos(productos, {
            generoSeleccionado,
            precioMin,
            precioMax,
            ordenPrecio,
        }),
    [productos, generoSeleccionado, precioMin, precioMax, ordenPrecio]);

    const limpiarFiltros = () => {
        setGeneroSeleccionado(null);
        setPrecioMin("");
        setPrecioMax("");
        setOrdenPrecio("ninguno");
    };

     useEffect(() => {
             fetch("http://127.0.0.1:8000/api/productos")
                 .then(res => res.json())
                 .then(data => setProductos(data.productos));
         }, []);
    return(
    <>
        <div className="VideoJuegos"> 
            <h2>VIDEOJUEGOS</h2>

            <div className="menu-genero">
                <button onClick={() => setGeneroSeleccionado(null)} className="btn-accion">Todos</button>
                {GENEROS.map((genero) => (
                    <button
                        key={genero}
                        onClick={() => setGeneroSeleccionado(genero)}
                        className="btn-accion"
                    >
                        {genero}
                    </button>
                ))}
            </div>

            <div className="filtros-extra">
                <input
                    type="number"
                    placeholder="Precio mín"
                    min="0"
                    value={precioMin}
                    onChange={(e) => setPrecioMin(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Precio máx"
                    min="0"
                    value={precioMax}
                    onChange={(e) => setPrecioMax(e.target.value)}
                />
                <select value={ordenPrecio} onChange={(e) => setOrdenPrecio(e.target.value)}>
                    <option value="ninguno">Orden</option>
                    <option value="asc">Precio: menor a mayor</option>
                    <option value="desc">Precio: mayor a menor</option>
                </select>
                <button onClick={limpiarFiltros} className="btn-limpiar">Limpiar</button>
            </div>
            <h3>{generoSeleccionado ? `Género: ${generoSeleccionado}` : "Todos los géneros"}</h3>
            <p className="contador-resultados">Resultados: {productosFiltrados.length}</p>
            <div className="Productos">
                <SeccionProductosVideojuegos  productos={productosFiltrados} />
            </div>
        </div>

    </>
    );
}
export default Videojuegos;