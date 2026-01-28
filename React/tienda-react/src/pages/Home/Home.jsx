import "./Home.css";
function Home(){
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
        </>
    );
}

export default Home