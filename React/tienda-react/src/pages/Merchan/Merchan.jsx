import "./Merchan.css";
import { useEffect, useState } from "react";
import SeccionProductosVideojuegos from "../../components/SeccionProductosVideojuegos/SeccionProductosVideojuegos";

function Merchan()
{
     const [productos, setProductos] = useState([]);

     useEffect(() => {
             fetch("http://127.0.0.1:8000/api/productos")
                 .then(res => res.json())
                 .then(data => setProductos(data.productos));
         }, []);
    return(
    <>
        <div className="VideoJuegos"> 
            <h2>MERCHANDAISING</h2>

            <div className="Productos">
                <SeccionProductosVideojuegos  productos={productos} />
            </div>
        </div>

    </>
    );
}
export default Merchan;