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

    if(!user) return <p>Cargando el perfil....</p>;
    return (
       <div className="Perfil">
            <div className="Perfil-card">
                    <h1>Mi Perfil</h1>
                    <p><b>Nombre:</b> {user.name}</p>
                    <p><b>Email:</b> {user.email}</p>
                    <p><b>Te uniste a Zent el : </b> {" "} 
                    { new Date(user.created_at).toLocaleDateString("es-ES")}</p>
            </div>
        <Link to="/"><button type="submit"className="btn-volver">Volver</button></Link>
        </div>
    );
}
export default Perfil;