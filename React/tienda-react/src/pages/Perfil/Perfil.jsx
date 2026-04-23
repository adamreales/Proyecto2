import "./Perfil.css"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { descargarFacturaPdf, getFacturas } from "../../services/facturas";
import { getMisValoraciones } from "../../services/valoraciones";

function Perfil() 
{
    const { t } = useTranslation();
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

    if(!user) return <p>{t("profile.loading")}</p>;
    return (
        <>
            {/* <h1>Mi Perfil</h1> */}
            <div className="Perfil-page">            
                <div className="Cabezera">
                    <h2>{t("profile.hello")},<b> {user.name}</b></h2> 
                    <button className="btn-cerrar"onClick={cerrarSession}> {t("profile.logout")}</button>
                </div>

                <div className="Configuracion">
                        <Link to="/mis-datos"><button className="btn-config">{t("profile.myData")}</button></Link>
                        <Link to="/mis-pedidos"><button className="btn-config">{t("profile.myOrders")}</button></Link>
                </div>
                <div className="subtitulos">
                    <h2>{t("profile.recentOrders")}</h2>
                     <Link to="/mis-pedidos"><button className="btn-config">{t("profile.myOrders")}</button></Link>
                </div>
                <div className="box-pedidos">
                    {ultimosPedidos.length === 0 ? (
                        <p>{t("profile.noOrdersYet")}</p>
                    ) : (
                        ultimosPedidos.slice(0, 3).map((pedido) => (
                            <div className="pedido-item" key={pedido.id}>
                                <p><b>{t("profile.orderLabel")}:</b> #{pedido.id_pedido ?? pedido.id}</p>
                                <p><b>{t("profile.invoiceLabel")}:</b> {pedido.numero_factura ?? t("profile.noNumber")}</p>
                                <p><b>{t("profile.totalLabel")}:</b> {Number(pedido.total ?? 0).toFixed(2)} EUR</p>
                                <button type="button" className="btn-config" onClick={() => handleDescargarFactura(pedido.id)}>
                                    {t("profile.downloadInvoice")}
                                </button>
                            </div>
                        ))
                    )}
                </div>
                <div className="subtitulos">
                    <h2>{t("profile.productOpinions")}</h2>
                 <Link to="/mis-opiniones"><button className="btn-config">{t("profile.myReviews")}</button></Link>
                </div>
                <div className="box-opiniones">
                    {ultimasValoraciones.length === 0 ? (
                        <p>{t("profile.noReviewsYet")}</p>
                    ) : (
                        ultimasValoraciones.slice(0, 3).map((valoracion) => (
                                <div className="valoracion-item" key={valoracion.id}>
                                    <p><b>{t("profile.productLabel")}:</b> {valoracion.producto_titulo || t("profile.productFallback")}</p>
                                    <p><b>{t("profile.ratingLabel")}:</b> {"⭐".repeat(valoracion.estrellas || 0)}</p>
                                    <p><b>{t("profile.commentLabel")}:</b> {valoracion.comentario || t("profile.noComment")}</p>                   
                                </div>
                            ))
                        )}
                    </div>
                </div>
       </>
    );
}
export default Perfil;
