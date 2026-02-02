import "./Home.css";
import {useEffect,useState} from "react";

function Home(){
	const [productos,setProductos] = useState([]);

	useEffect(()=>
	{
		fetch("http://localhost:8000/api/masvendidos")
		.then(res=>res.json())
		.then(data => {
        setProductos(data.productos);
		})
		.catch(err => console.error(err));
	}, []);
    return (
        <> 
        <article className="portada">
			<div className="box1">
				 <video id="video-portada" autoPlay muted playsInline preload="auto">
					<source src="/imagesideas/Tienda.mp4" type="video/mp4"/>
					Tu navegador no soporta vídeo.
				</video> 
			</div>
			<div className="box2">
				<img src="/imagesideas/MejoresPrecio.png" className=""/>		
			</div>
		</article>
		<main>
			<h2 className="subtitulo">Los Mas Vendidos</h2>
			<section className="MasVendidos">
				{productos.slice(0, 5).map(p => (
				<div className="producto-catalogo" key={p.id}>
					<div className="imagen-producto">
						<img src={`http://localhost:8000/storage/${p.imagen}`}/>
					</div>
					<div className="info-producto">
						<h3>{p.nombre}</h3>
						<p>${p.precio}</p>
					</div>
				</div>
				))}
			</section>
		</main>
        </>
    );
}

export default Home