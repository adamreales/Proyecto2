import "./Producto.css"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Producto() 
{
    const {id} = useParams();
    const [producto,setProducto] = useState(null);

    useEffect(() => {
       fetch(`http://127.0.0.1:8000/api/producto/${id}?token=TU_TOKEN`)
            .then(res => res.json())
            .then(data => {
                setProducto(data.producto);
            });
    }, [id]);
    
    if (!producto) return <p>Cargando...</p>;
   
    return (
        <>
       <div className="box">
            <div className="box-img">
                <img src={`http://zent.es/${producto.do_imagenes?.[0]?.url}`} alt={producto.titulo} />
            </div>
            <div className="box-datos">
                    <div><h1>{producto.titulo}</h1>
                    <p>{producto.descripcion}</p>
                </div>
                <div className="Stream">
                    <p>Steam | En stock | Descarga digital</p>
                </div>
                <select id="plataformas" name="plataformas" className="plataformas">
                    {producto.do_juego.do_plataformas?.map(plataforma => (
                        <option key={plataforma.id} value={plataforma.id}>{plataforma.nombre}</option>
                    ))}
                </select>
                <div className="precio">
                    <span className="final"> {producto.precio} € </span>
                </div>
                
                <div className="btn-box">
                    <button className="btn-favoritos">♡</button>
                    <button className="btn-cesta">Reservar</button>
                </div>
            </div>
        </div>
        <div className="imagenes">
            <div className="caja-imagen">
                <img src={`http://zent.es/${producto.do_imagenes?.[1]?.url}`} alt={producto.titulo} />
            </div>
            <div className="caja-imagen">
                <img src={`http://zent.es/${producto.do_imagenes?.[2]?.url}`} alt={producto.titulo} />
            </div>
            <div className="caja-imagen">
                <img src={`http://zent.es/${producto.do_imagenes?.[3]?.url}`} alt={producto.titulo} />
            </div>
            <div className="caja-imagen">
                <img src={`http://zent.es/${producto.do_imagenes?.[0]?.url}`} alt={producto.titulo} />
            </div>
        </div>
      </>
    );
}
export default Producto;