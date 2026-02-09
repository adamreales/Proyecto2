import "./Home.less";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Valoraciones from "../../components/Valoraciones/Valoraciones";
import SeccionProductos from "../../components/SeccionProductos/SeccionProductos";

function Home() {
    const [masVendidos, setMasvendidos] = useState([]);
    const [masValorados, setMasvalorados] = useState([]);
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/productos_mas_vendidos")
            .then(res => res.json())
            .then(data => setMasvendidos(data.masVendidos))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/productos_mas_populares")
            .then(res => res.json())
            .then(data => setMasvalorados(data.masPopulares));
    }, []);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/productos")
            .then(res => res.json())
            .then(data => setProductos(data.productos));
    }, []);

    return (
        <>
            <article className="portada">
                <div className="box1">
                    <video id="video-portada" autoPlay muted playsInline preload="auto">
                        <source src="/imagesideas/Tienda.mp4" type="video/mp4" />
                    </video>
                </div>

                <div className="box2">
                    <img src="/imagesideas/MejoresPrecio.png" />
                </div>
            </article>

            <main>
                <SeccionProductos titulo="Los Mas Vendidos" productos={masVendidos} />
                <SeccionProductos titulo="Los Mas Valorados" productos={masValorados} />

                <article className="Sponsor">
                    <Link to="/videojuegos">
                        <img className="Promo" src="/imagesideas/Anuncio.jpeg" />
                    </Link>
                </article>

                <SeccionProductos titulo="Reservas" productos={productos} />

                <Valoraciones />

                <SeccionProductos titulo="Weekly deals" productos={productos} />
            </main>
        </>
    );
}

export default Home;