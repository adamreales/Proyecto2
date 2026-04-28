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
                        if (!res.ok) {
                            if (res.status === 401 || res.status === 403) {
                                const authError = new Error("AUTH_ERROR");
                                authError.isAuthError = true;
                                throw authError;
                            }
                            throw new Error("PROFILE_LOAD_ERROR");
                        }
            return res.json();
        })
        .then(data => {
            setUser(data.user);
        })
                .catch((error) => {
                        if (error?.isAuthError) {
                            localStorage.removeItem("token");
                            navigate("/login");
                            return;
                        }
                        setUser(null);
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
                    <div className="Cabezera-acciones">
                        <Link to="/mis-datos" className="btn-nav">{t("profile.myData")}</Link>
                        <button className="btn-cerrar" onClick={cerrarSession}>{t("profile.logout")}</button>
                    </div>
                </div>
                <div className="subtitulos">
                    <h2>{t("profile.recentOrders")}</h2>
                    <Link to="/mis-pedidos" className="link-ver-todos">{t("profile.myOrders")}</Link>
                </div>
                <div className="box-pedidos">
                    {ultimosPedidos.length === 0 ? (
                        <p>{t("profile.noOrdersYet")}</p>
                    ) : (
                        ultimosPedidos.slice(0, 3).map((pedido) => (
                            <div className="pedido-item" key={pedido.id}>
                                <div className="pedido-info">
                                    <span className="pedido-tag">{t("profile.orderLabel")} #{pedido.id_pedido ?? pedido.id}</span>
                                    <span className="pedido-total">{Number(pedido.total ?? 0).toFixed(2)} EUR</span>
                                </div>
                                <p className="pedido-factura">{t("profile.invoiceLabel")}: {pedido.numero_factura ?? t("profile.noNumber")}</p>
                                <button type="button" className="btn-descargar" onClick={() => handleDescargarFactura(pedido.id)}>
                                    ↓ {t("profile.downloadInvoice")}
                                </button>
                            </div>
                        ))
                    )}
                </div>
                <div className="subtitulos">
                    <h2>{t("profile.productOpinions")}</h2>
                    <Link to="/mis-opiniones" className="link-ver-todos">{t("profile.myReviews")}</Link>
                </div>
                <div className="box-opiniones">
                    {ultimasValoraciones.length === 0 ? (
                        <p>{t("profile.noReviewsYet")}</p>
                    ) : (
                        ultimasValoraciones.slice(0, 3).map((valoracion) => (
                                <div className="valoracion-item" key={valoracion.id}>
                                    <p className="valoracion-producto">{valoracion.producto_titulo || t("profile.productFallback")}</p>
                                    <p className="valoracion-estrellas">{"⭐".repeat(valoracion.estrellas || 0)}</p>
                                    <p className="valoracion-comentario">{valoracion.comentario || t("profile.noComment")}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
       </>
    );
}
export default Perfil;
