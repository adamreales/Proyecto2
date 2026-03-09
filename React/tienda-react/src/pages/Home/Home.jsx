import "./Home.less";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Valoraciones from "../../components/Valoraciones/Valoraciones";
import SeccionProductos from "../../components/SeccionProductos/SeccionProductos";
import AnuncioVideojuego from "../../components/AnuncioVideoJuego/AnuncioVideojuego";
import Mapa from "../../components/Mapa/Mapa";
function Home() {
    const [masVendidos, setMasvendidos] = useState([]);
    const [masValorados, setMasvalorados] = useState([]);
    const [productos, setProductos] = useState([]);
    const [ofertas,setOfertas] = useState([]);
    const [recientes,setRecientes] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const animalcrossing = masVendidos.find(p => p.titulo === "Animal Crossing: New Leaf");
    const  raiders= masVendidos.find(p => p.titulo === "Arc Raiders");
    const imagenes = [
        "http://zent.es/imagenes_producto/MejoresPrecio.png",
        "http://zent.es/imagenes_producto/Oferta.jpeg",
        "http://zent.es/imagenes_producto/Oferta2.jpeg",
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % imagenes.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + imagenes.length) % imagenes.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const fetchJson = async (url) => {
        const res = await fetch(url);
        const raw = await res.text();

        let data;
        try {
            data = JSON.parse(raw);
        } catch {
            throw new Error(`Respuesta no JSON en ${url}. Revisa errores PHP/Laravel.`);
        }

        if (!res.ok) {
            throw new Error(data?.error || `Error ${res.status} en ${url}`);
        }

        return data;
    };

    useEffect(() => {
        fetchJson("http://127.0.0.1:8000/api/productos_mas_vendidos")
            .then(data => setMasvendidos(data.productos || []))
            .catch(err => console.error("Home mas vendidos:", err));
    }, []);

    useEffect(() => {
        fetchJson("http://127.0.0.1:8000/api/productos_mas_populares")
            .then(data => setMasvalorados(data.productos || []))
            .catch(err => console.error("Home mas populares:", err));
    }, []);

    useEffect(() => {
        fetchJson("http://127.0.0.1:8000/api/productos")
            .then(data => setProductos(data.productos || []))
            .catch(err => console.error("Home productos:", err));
    }, []);

    useEffect(() => {
        fetchJson("http://127.0.0.1:8000/api/productos_mas_actuales")
        .then(data => setOfertas(data.productos || []))
        .catch(err => console.error("Home ofertas:", err));
    },[]);
    useEffect(() => {
        fetchJson("http://127.0.0.1:8000/api/productos_mas_actuales")
        .then(data => setRecientes(data.productos || []))
        .catch(err => console.error("Home recientes:", err));
    },[]);

    return (
        <>
            <article className="portada">
                <div className="box1">
                    <Link to="/videojuegos"><video id="video-portada" autoPlay muted playsInline preload="auto">
                        <source src="http://zent.es/imagenes_producto/Tienda.mp4" type="video/mp4" />
                    </video></Link>
                </div>

                <div className="box2">
                    <div className="carousel-container">
                          <Link to="/videojuegos"><img src={imagenes[currentSlide]} alt="Slide" /></Link>
                        <div className="carousel-dots">
                            {imagenes.map((_, index) => (
                                <span
                                    key={index}
                                    className={`dot ${index === currentSlide ? "active" : ""}`}
                                    onClick={() => goToSlide(index)}
                                ></span>
                            ))}
                        </div>
                    </div>
                </div>
            </article>

            <main>
                <SeccionProductos titulo="Los Mas Vendidos" productos={masVendidos} />
                <SeccionProductos titulo="Los Mas Valorados" productos={masValorados} />
             
                {animalcrossing && (<AnuncioVideojuego imageSrc="http://zent.es/imagenes_producto/AnimalCrosin.jpg" producto={animalcrossing} />
)}

                <SeccionProductos titulo="Reservas" productos={productos} />

                <Valoraciones />

                <SeccionProductos titulo="Añadidos Recientemente" productos={recientes} />
                {animalcrossing && (<AnuncioVideojuego imageSrc="http://zent.es/imagenes_producto/AnuncioJuego.jpg" producto={raiders} />)}
                <SeccionProductos titulo="Weekly deals" productos={ofertas} />

                 <Mapa/>
            </main>
        </>
    );
}

export default Home;