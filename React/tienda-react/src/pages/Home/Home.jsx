import "./Home.less";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Valoraciones from "../../components/Valoraciones/Valoraciones";
import SeccionProductos from "../../components/SeccionProductos/SeccionProductos";
import AnuncioVideojuego from "../../components/AnuncioVideoJuego/AnuncioVideojuego";

function Home() {
    const [masVendidos, setMasvendidos] = useState([]);
    const [masValorados, setMasvalorados] = useState([]);
    const [productos, setProductos] = useState([]);
    const [ofertas,setOfertas] = useState([]);
    const [recientes,setRecientes] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const imagenes = [
        "/imagesideas/MejoresPrecio.png",
        "/imagesideas/Oferta.jpeg",
        "/imagesideas/Oferta2.jpeg"
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

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/ofertas_semanales")
        .then(res => res.json())
        .then(data => setOfertas(data.ofertas));
    },[]);
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/anadidos_recientemente")
        .then(res => res.json())
        .then(data => setRecientes(data.recientes));
    },[]);

    return (
        <>
            <article className="portada">
                <div className="box1">
                    <Link to="/videojuegos"><video id="video-portada" autoPlay muted playsInline preload="auto">
                        <source src="/imagesideas/Tienda.mp4" type="video/mp4" />
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

                <AnuncioVideojuego imageSrc="/imagesideas/AnimalCrosin.jpg" />

                <SeccionProductos titulo="Reservas" productos={productos} />

                <Valoraciones />

                <SeccionProductos titulo="Añadidos Recientemente" productos={recientes} />
                <AnuncioVideojuego imageSrc="/imagesideas/AnuncioJuego.jpg" />
                <SeccionProductos titulo="Weekly deals" productos={ofertas} />
            </main>
        </>
    );
}

export default Home;