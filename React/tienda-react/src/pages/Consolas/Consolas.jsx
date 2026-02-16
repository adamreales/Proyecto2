import "./Consolas.css";
import { useEffect, useState } from "react";
import SeccionProductosVideojuegos from "../../components/SeccionProductosVideojuegos/SeccionProductosVideojuegos";


function  Consolas() {
  const  [productos, setMasBaratos] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/productos")
        .then(res => res.json())
        .then(data => setMasBaratos(data.productos));  
  }, []);

  return (
    <>
       <div className="pagina-consolas"> 
         <h2>CONSOLAS</h2>

            <div className="Productos">
                <SeccionProductosVideojuegos  productos={productos} />
            </div>
        </div>

    </>
  );
}

export default Consolas;