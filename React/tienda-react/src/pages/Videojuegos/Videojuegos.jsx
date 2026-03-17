import "./Videojuegos.css";
import { useEffect, useState } from "react";
import SeccionProductosVideojuegos from "../../components/SeccionProductosVideojuegos/SeccionProductosVideojuegos";

function Videojuegos() {
  const [productos, setProductos] = useState([]);
  const [pagina, setPagina] = useState(1);

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
    fetch(`http://127.0.0.1:8000/api/productos?&page=${pagina}&limit=20`)
      .then((res) => res.json())
      .then((data) => setProductos(data.productos || []))
      .catch((err) => console.error(err));
  }, [pagina]);

  return (
    <>   
    <div className="VideoJuegos">
          <h2>VIDEOJUEGOS</h2>
          <div className="Productos">
            <SeccionProductosVideojuegos productos={productos} />
          </div>
           <div className="cabezera">
            <h3 className="pagina-actual">Pagina {pagina}</h3>
           <div className="botones">
              <button className="btn-prev" onClick={prev} disabled={pagina === 1}><img src="http://zent.es/imagenes_producto/correrizq.png" className="mario" /></button>
              <button className="btn-next" onClick={next} disabled={productos.length < 20}><img src="http://zent.es/imagenes_producto/correr.png" className="mario mario-right" /></button>
            </div>
        </div>
    </div>
    </>

  );
}

export default Videojuegos;
