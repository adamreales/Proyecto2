import "./Perfil.css"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { descargarFacturaPdf, getFacturas } from "../../services/facturas";
import { getMisValoraciones } from "../../services/valoraciones";

function Perfil() 
{
    
    const token = localStorage.getItem("token");
    const [user, setUser] = useState(null);
    const [ultimosPedidos, setUltimosPedidos] = useState([]);
    const [ultimasValoraciones, setUltimasValoraciones] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
        navigate("/login");
        return;
        }

        fetch("http://localhost:8000/api/perfil", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
        })
        .then(res => {
            if (!res.ok) throw new Error();
            return res.json();
        })
        .then(data => {
            setUser(data.user);
        })
        .catch(() => {
            localStorage.removeItem("token");
            navigate("/login");
        });

        getFacturas()
        .then((facturas) => {
            if (Array.isArray(facturas)) {
                setUltimosPedidos(facturas.slice(0, 3));
            }
        })
        .catch(() => {
            setUltimosPedidos([]);
        });

        getMisValoraciones()
        .then((valoraciones) => {
            if (Array.isArray(valoraciones)) {
                setUltimasValoraciones(valoraciones.slice(0, 3));
            }
        })
        .catch(() => {
            setUltimasValoraciones([]);
        });

    }, [navigate, token]);

    const handleDescargarFactura = async (facturaId) => {
        try {
            await descargarFacturaPdf(facturaId);
        } catch (error) {
            console.error("Error al descargar factura", error);
        }
    };

    const  cerrarSession = async () => {
        try{

            await fetch("http://localhost:8000/api/cerrar_session", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + token
                }
            });
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }catch(error){
            console.error("Error al cerrar sesion",error);
        }
    }

    if(!user) return <p>Cargando el perfil....</p>;
    return (
        <>
            {/* <h1>Mi Perfil</h1> */}
            <div className="Perfil-page">            
                <div className="Cabezera">
                    <h2>Hola,<b> {user.name}</b></h2> 
                    <button className="btn-cerrar"onClick={cerrarSession}> Cerrar sesión</button>
                </div>

                <div className="Configuracion">
                        <Link to="/mis-datos"><button className="btn-config">MIS DATOS</button></Link>
                        <Link to="/mis-pedidos"><button className="btn-config">MIS PEDIDOS</button></Link>
                </div>
                <div className="subtitulos">
                    <h2>Tus Últimos Pedidos Realizados</h2>
                     <Link to="/mis-pedidos"><button className="btn-config">MIS PEDIDOS</button></Link>
                </div>
                <div className="box-pedidos">
                    {ultimosPedidos.length === 0 ? (
                        <p>No tienes pedidos todavía.</p>
                    ) : (
                        ultimosPedidos.slice(0, 3).map((pedido) => (
                            <div className="pedido-item" key={pedido.id}>
                                <p><b>Pedido:</b> #{pedido.id_pedido ?? pedido.id}</p>
                                <p><b>Factura:</b> {pedido.numero_factura ?? "Sin numero"}</p>
                                <p><b>Total:</b> {Number(pedido.total ?? 0).toFixed(2)} EUR</p>
                                <button type="button" className="btn-config" onClick={() => handleDescargarFactura(pedido.id)}>
                                    Descargar factura
                                </button>
                            </div>
                        ))
                    )}
                </div>
                <div className="subtitulos">
                    <h2>Mis Opiniones de Productos</h2>
                 <Link to="/mis-opiniones"><button className="btn-config">MIS OPINIONES</button></Link>
                </div>
                <div className="box-opiniones">
                    {ultimasValoraciones.length === 0 ? (
                        <p>No has realizado valoraciones todavía.</p>
                    ) : (
                        ultimasValoraciones.slice(0, 3).map((valoracion) => (
                                <div className="valoracion-item" key={valoracion.id}>
                                    <p><b>Producto:</b> {valoracion.producto_titulo || "Producto"}</p>
                                    <p><b>Valoracion:</b> {"⭐".repeat(valoracion.estrellas || 0)}</p>
                                    <p><b>Comentario:</b> {valoracion.comentario || "Sin comentario"}</p>                   
                                </div>
                            ))
                        )}
                    </div>
                </div>
       </>
    );
}
export default Perfil;
