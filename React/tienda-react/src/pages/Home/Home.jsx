import "./Home.css";
function Home(){
    return (
        <> 
        <article class="portada">
			<div class="box1">
				 <video id="video-portada" autoplay muted playsinline preload="auto">
					<source src="/imagesideas/Tienda.mp4" type="video/mp4"/>
					Tu navegador no soporta vídeo.
				</video> 
			</div>
			<div class="box2">
				<img src="/imagesideas/MejoresPrecio.png" class=""/>		
			</div>
		</article>
        </>
    );
}

export default Home