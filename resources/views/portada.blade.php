<!DOCTYPE html >

<html>
	<head>
	    <title>ZENT SHOP</title>
		<meta charset="utf-8">
        @vite(['resources/css/app.css', 'resources/js/app.js'])
	</head>

	<body>
		 <header>	
			<div class="Logo">
				<button id="btn-logo"><img src="{{ asset('imagesideas/Logo.png') }}"></button>
				<script>
					document.getElementById("btn-logo").addEventListener("click",function(){
						window.location.href = "index.html";
					});
				</script>
			</div>	
			<div class="Barra-menu">
					<button class="menu-btn">VIDEOJUEGOS</button>
					<button class="menu-btn">CONSOLAS</button>
					<button class="menu-btn">MERCHANDISING</button>
					<button class="menu-btn" id="btn-conocenos">CONOCENOS</button>
					<script>
						document.getElementById("btn-conocenos").addEventListener("click",function(){
							window.location.href ="conocenos.html";
						})
					</script>
					<button class="menu-btn">OUTLET</button>
			</div>	
			<div class="Login">
				<button class="Log">Login</button>
				<button class="Reg">Registrate</button>
			</div>
		</header>
		<article class="portada">
			<div class="box1">
				 <video id="video-portada" autoplay muted playsinline preload="auto">
					<source src="{{ asset('imagesideas/Tienda.mp4') }}" type="video/mp4">
					Tu navegador no soporta vídeo.
				</video> 
			</div>
			<div class="box2">
				<img src="{{ asset('imagesideas/Logo.png') }}">
			</div>
		</article>
		<footer>
			<div class="footer-container">
				<div class="footer-col">
					<h3>WHO WE ARE?</h3>
					<ul>
						<li><a href="#">About Us</a></li>
						<li><a href="#">Careers</a></li>
						<li><a href="#">Tour</a></li>
					</ul>
				</div>

				<div class="footer-col">
					<h3>SUPPORT</h3>
					<ul>
						<li><a href="#">Affiliate Programs</a></li>
						<li><a href="#">Advertise</a></li>
						<li><a href="#">FAQ</a></li>
					</ul>
				</div>

				<div class="footer-col">
					<h3>PARTNERS</h3>
					<ul>
						<li><a href="#">Knowledge Base</a></li>
						<li><a href="#">Video Guides</a></li>
						<li><a href="#">Report a Bug</a></li>
					</ul>
				</div>
				<div class="footer-col">
					<h3>LEGAL</h3>
					<ul>
						<li><a href="#">Privacy Policy</a></li>
						<li><a href="#">Terms &amp; Conditions</a></li>
						<li><a href="#">Cookie Policy</a></li>
					</ul>
				</div>
				<div class="footer-col">
					<h3>NEWSLETTER</h3>
					<form class="newsletter">
						<input type="email" placeholder="Enter your email">
						<button type="submit">→</button>
					</form>
				</div>

			</div>

			<div class="footer-bottom">
				<div class="social-icons">
					<img src="imagesideas/Instagram.png" >
					<img src="imagesideas/Twiter.png" >
					<img src="imagesideas/facebook.png" alt="face">
				</div>
				<p>Copyright © 2017 sendesingnz. All Rights Reserved</p>
			</div>
		</footer>
		@vite(['resources/js/app.js'])
	</body>
</html>