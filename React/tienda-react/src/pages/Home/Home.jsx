import "./Home.css";
import {useEffect,useState} from "react";
import {Link} from "react-router-dom";

function Home(){
	const [masVendidos,setMasvendidos] = useState([]);
	const [masValorados,setMasvalorados] = useState([]);
	const [productos,setProductos] = useState([]);
	useEffect(()=>
	{
		fetch("http://127.0.0.1:8000/api/productos_mas_vendidos")
		.then(res=>res.json())
		.then(data => {
       		setMasvendidos(data.masVendidos);
		})
		.catch(err => console.error(err));
	}, []);

	useEffect(() => 
	{
		fetch("http://127.0.0.1:8000/api/productos_mas_populares")
		.then(res => res.json())
		.then(data => {
			setMasvalorados(data.masPopulares);
		})
	},[]);
	useEffect(() => 
	{
		fetch("http://127.0.0.1:8000/api/productos")
		.then(res => res.json())
		.then(data => {
			setProductos(data.productos);
		})
	},[]);
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
				{masVendidos.slice(0, 3).map(p => (
				<div className="producto-catalogo" key={p.id}>
					<div className="imagen-producto">
						<img
							src={`http://zent.es/${p.do_imagenes[0].url}`}
							alt={p.titulo}
						/>
					</div>
					<div className="info-producto">
						<h3>{p.titulo}</h3>
						<p>{p.precio} €</p>
					</div>
				</div>
				))}
			</section>
			<h2 className="subtitulo">Los Mas Valorados</h2>
			<section className="MasVendidos">
				{masValorados.slice(0, 3).map(p => (
				<div className="producto-catalogo" key={p.id}>
					<div className="imagen-producto">
						<img
							src={`http://zent.es/${p.do_imagenes[0].url}`}
							alt={p.titulo}
						/>
					</div>
					<div className="info-producto">
						<h3>{p.titulo}</h3>
						<p>{p.precio} €</p>
					</div>
				</div>
				))}
			</section>
			<article className="Sponsor">
				<Link to="/videojuegos"><img className="Promo" src="/imagesideas/Anuncio.jpeg"></img></Link>
			</article>
			<h2 className="subtitulo">Reservas</h2>
			<section className="MasVendidos">
				{productos.slice(0, 3).map(p => (
				<div className="producto-catalogo" key={p.id}>
					<div className="imagen-producto">
						<img
							src={`http://zent.es/${p.do_imagenes[0].url}`}
							alt={p.titulo}
						/>
					</div>
					<div className="info-producto">
						<h3>{p.titulo}</h3>
						<p>{p.precio} €</p>
					</div>
				</div>
				))}
			</section>
		</main>
        </>
    );
}

export default Home