import "./Perfil.css"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Perfil() 
{
    
    const token = localStorage.getItem("token");
    const [user, setUser] = useState(null);
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

    }, []);
    const  cerrarSession = async () => {
        try{

            await fetch("http://localhost:8000/api/cerrar_session", {
                method: "POST"
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
            <h1>Mi Perfil</h1>
            <div className="Perfil-page">            
                <div className="Cabezera">
                    <h2>Hola,<b> {user.name}</b></h2> 
                    <button className="btn-volver"onClick={cerrarSession}> Cerrar sesión</button>
                </div>

                <div className="Configuracion">
                        <button className="btn-config">MIS DATOS</button>
                        <button className="btn-config">MIS TARJETAS</button>
                
                        <button className="btn-config">LIBRETA DE DIRECCIONES</button>
                        <button className="btn-config">MIS PEDIDOS</button>
                </div>
                <h2>Tus Últimos Pedidos Realizados</h2>
                <div className="box-pedidos">
                    <div>
                         <p>aqui iran los pedidos</p>
                    </div>
                </div>
                <h2>Libreta de direcciones</h2>
                <div className="box-direcciones">
                    <a>Holaaa</a>
                </div>
                <h2>Mis Opiniones de Productos</h2>
                <div className="box-opiniones">
                    <a>Holaaa</a>
                </div>
            </div>
       </>
    );
}
export default Perfil;
