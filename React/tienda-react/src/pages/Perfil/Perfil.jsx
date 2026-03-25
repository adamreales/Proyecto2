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
                    <button className="btn-cerrar"onClick={cerrarSession}> Cerrar sesión</button>
                </div>

                <div className="Configuracion">
                        <Link to="/mis-datos"><button className="btn-config">MIS DATOS</button></Link>
                        <Link to="/mis-pedidos"><button className="btn-config">MIS PEDIDOS</button></Link>
                </div>
                <h2>Tus Últimos Pedidos Realizados</h2>
                <div className="box-pedidos">
                    <div>
                         <p>aqui iran los pedidos</p>
                    </div>
                </div>
                <h2>Mis Opiniones de Productos</h2>
                <div className="box-opiniones">
                    <Link to="/mis-opiniones"><button className="btn-config">MIS OPINIONES</button></Link>
                </div>
            </div>
       </>
    );
}
export default Perfil;
