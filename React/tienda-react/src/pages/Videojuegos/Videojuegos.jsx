import "./Videojuegos.css";
import { useEffect, useState } from "react";
import SeccionProductosVideojuegos from "../../components/SeccionProductosVideojuegos/SeccionProductosVideojuegos";

function Videojuegos() {
  const [productos, setProductos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [categoria, setCategoria] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [orden, setOrden] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [plataformas, setPlataformas] = useState([]);
  const ordenEspecial =
    orden === "productos_mas_baratos" ||
    orden === "productos_mas_alfabeticamente" ||
    orden === "productos_menos_alfabeticamente" ||
    orden === "productos_mas_caros";

  const next = () => {
    if (productos.length === 20) {
      setPagina((prevPagina) => prevPagina + 1);
    }
  };

  const prev = () => {
    if (pagina > 1) {
      setPagina((prevPagina) => prevPagina - 1);
    }
  };

  useEffect(() => {
    let url = `http://127.0.0.1:8000/api/productos?page=${pagina}&limit=20`;

    if (categoria) {
      url = `http://127.0.0.1:8000/api/productos_categoria/${categoria}`;
    } else if (plataforma) {
      url = `http://127.0.0.1:8000/api/productos_plataforma/${plataforma}`;
    } else if (ordenEspecial) {
      url = `http://127.0.0.1:8000/api/${orden}`;
    }

    if(orden && !ordenEspecial)
      url += `&orden=${orden}`;

      fetch(url)
      .then((res) => res.json())
      .then((data) => setProductos(data.productos || data.producto || []))
      .catch((err) => console.error(err));
  }, [pagina, categoria, plataforma, orden]);

  //Cargo las categorias para el filtro
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/categorias`)
      .then((res) => res.json())
      .then((data) => setCategorias(data.categorias || []))
      .catch((err) => console.error(err));
  }, []);

  //Cargo las plataformas para el filtro
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/plataformas`)
      .then((res) => res.json())
      .then((data) => setPlataformas(data.plataformas || []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>   
    <div className="VideoJuegos">
          <h2>VIDEOJUEGOS</h2>
          <div className="Filtros">
              <button className="btn-filtros" onClick={() => { setOrden("productos_mas_caros"); setPagina(1); }}>Ordenar Mayor precio</button>
              <button className="btn-filtros" onClick={() => { setOrden("productos_mas_baratos"); setPagina(1); }}>Ordenar Menor precio</button>
              <button className="btn-filtros" onClick={() => { setOrden("productos_mas_alfabeticamente"); setPagina(1); }}>Alfabeticamente A-Z</button>
              <button className="btn-filtros" onClick={() => { setOrden("productos_menos_alfabeticamente"); setPagina(1); }}>Alfabeticamente Z-A</button>
              <select className="btn-filtros" onChange={(e) => {
                setCategoria(e.target.value);
                setPlataforma("");
                setPagina(1);}}>
                <option value="">Filtrar por categoría</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                ))}
              </select>

              <select className="btn-filtros" onChange={(e) => {
                setPlataforma(e.target.value);
                setCategoria("");
                setPagina(1);
              }}>
                <option value="">Filtrar por plataforma</option>
                {plataformas.map((plataforma) => (
                  <option key={plataforma.id} value={plataforma.id}>{plataforma.nombre}</option>
                ))}
              </select>
              <button className="btn-filtros" onClick={() => { setCategoria(""); setPlataforma(""); setOrden(""); setPagina(1); }}>X</button>
          </div>
          <div className="Productos">
            <SeccionProductosVideojuegos productos={productos} />
          </div>
           <div className="cabezera">
            <h3 className="pagina-actual">Pagina {pagina}</h3>
           <div className="botones">
              <button className="btn-prev" onClick={prev} disabled={pagina === 1 || ordenEspecial}><img src="http://zent.es/imagenes_producto/correrizq.png" className="mario" /></button>
              <button className="btn-next" onClick={next} disabled={productos.length < 20 || ordenEspecial}><img src="http://zent.es/imagenes_producto/correr.png" className="mario mario-right" /></button>
            </div>
        </div>
    </div>
    </>

  );
}

export default Videojuegos;
