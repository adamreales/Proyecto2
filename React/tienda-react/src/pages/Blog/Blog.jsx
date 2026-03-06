import "./Blog.css";
import { useEffect, useState } from "react";

function  Blog() {
 

  return (
    <>
       <div className="pagina-blog"> 
         <h2>BLOG</h2>
          <div className="blog-container">  
            <div className="post-blog">
                  <div className="img-post">
                      <img src="http://zent.es/imagenes_producto/gta6.webp" alt="Post 1" />
                  </div>
                  <div className="contenido-post">
                      <h3>Grand Theft Auto VI (GTA 6)</h3>
                      <p>
                      Grand Theft Auto VI (GTA 6) es el próximo título de la popular serie de videojuegos de acción y aventura desarrollada por Rockstar Games. 
                      Ambientado en un mundo abierto, el juego promete una narrativa envolvente, gráficos de última generación y una experiencia de juego inmersiva.
                      </p>
                      <p>
                      Desde su lanzamiento, ha recibido críticas muy positivas tanto por parte de la comunidad como de la prensa especializada, posicionándose como uno de los títulos emergentes más prometedores del año. 
                      GTA 6 demuestra el potencial creativo y técnico de la industria del videojuego.
                      </p>
                  </div>
              </div>
              <hr /> 
              <div className="post-blog">
                  <div className="img-post">
                      <img src="http://zent.es/imagenes_producto/crisol.jpg" alt="Post 1" />
                  </div>
                  <div className="contenido-post">
                      <h3>CRISOL El Nuevo juego Español</h3>
                      <p>
                      Crisol es el nuevo videojuego español que está captando la atención internacional por su innovadora propuesta y su potente identidad visual. 
                      Desarrollado por un estudio independiente nacional, combina acción, narrativa envolvente y una dirección artística única que lo distingue dentro del panorama actual.
                      </p>
                      <p>
                      Desde su lanzamiento, ha recibido críticas muy positivas tanto por parte de la comunidad como de la prensa especializada, posicionándose como uno de los títulos emergentes más prometedores del año. 
                      Crisol demuestra el potencial creativo y técnico de la industria española del videojuego.
                      </p>
                  </div>
              </div>
              <hr />
              <div className="post-blog">
                  <div className="img-post">
                      <img src="http://zent.es/imagenes_producto/pokemon.png" alt="Post 1" />
                  </div>
                  <div className="contenido-post">
                     <h3>Pokémon Ediciones "Rojo Fuego / Verde Hoja"</h3>
                      <p>
                      Pokémon Ediciones Rojo Fuego y Verde Hoja son remakes lanzados en 2004 para Game Boy Advance, desarrollados por Game Freak y publicados por Nintendo. 
                      Se trata de versiones actualizadas de los títulos originales Pokémon Rojo y Pokémon Verde de 1996, pertenecientes a la primera generación de la saga.
                      </p>
                      <p>
                      Ambientados en la región de Kanto, el jugador inicia su aventura eligiendo entre Bulbasaur, Charmander o Squirtle como Pokémon inicial, con el objetivo de convertirse en Campeón de la Liga Pokémon y completar la Pokédex. 
                      Estas ediciones incorporaron mejoras gráficas, nuevas mecánicas heredadas de la tercera generación y contenido adicional como las Islas Sete, ampliando la experiencia original.
                      </p>
                      <p>
                      Rojo Fuego y Verde Hoja marcaron una nueva etapa para la franquicia en Game Boy Advance, consolidando el éxito internacional de la saga y acercando la primera generación a una nueva generación de jugadores.
                      </p>
                  </div>
              </div>
              <hr />
              <div className="post-blog">
                  <div className="img-post">
                      <img src="http://zent.es/imagenes_producto/marioodyssy.jpg" alt="Post 1" />
                  </div>
                  <div className="contenido-post">
                    <h3>Super Mario Odyssey</h3>
                    <p>
                    Super Mario Odyssey es un videojuego de plataformas en 3D desarrollado y publicado por Nintendo para Nintendo Switch en 2017. 
                    Se trata de una de las entregas más ambiciosas de la saga Super Mario, recuperando el estilo de exploración libre visto en títulos como Super Mario 64 y Super Mario Sunshine.
                    </p>
                    <p>
                    En esta aventura, Mario viaja por distintos reinos alrededor del mundo con el objetivo de rescatar a la princesa Peach de Bowser. 
                    La principal novedad del juego es Cappy, un sombrero con vida propia que permite a Mario capturar y controlar enemigos, objetos e incluso criaturas del entorno, aportando una mecánica innovadora y estratégica al gameplay.
                    </p>
                    <p>
                    El juego fue aclamado por la crítica por su diseño de niveles, creatividad y libertad de exploración, convirtiéndose en uno de los títulos más exitosos y valorados del catálogo de Nintendo Switch.
                    </p>
                  </div>
              </div>
              <hr />
              <div className="post-blog">
                  <div className="img-post">
                      <img src="http://zent.es/imagenes_producto/kirby.jpg" alt="Post 1" />
                  </div>
                  <div className="contenido-post">
                    <h3>Kirby y la tierra olvidada</h3>
                    <p>
                      Kirby y la tierra olvidada es un videojuego de plataformas en 3D desarrollado por HAL Laboratory y publicado por Nintendo para Nintendo Switch en 2022. 
                      Se trata de la primera aventura completamente tridimensional del personaje, marcando un punto de inflexión en la evolución de la saga.
                      </p>
                      <p>
                      En esta entrega, Kirby despierta en un mundo misterioso con escenarios que recuerdan a una civilización abandonada. 
                      A lo largo de la aventura deberá rescatar a los Waddle Dee secuestrados mientras explora niveles abiertos, derrota enemigos y utiliza sus clásicas habilidades de copia, absorbiendo poderes como fuego, espada o hielo.
                      </p>
                      <p>
                      Una de las grandes novedades es el “modo bocamodo”, que permite a Kirby transformarse en objetos del entorno como coches, máquinas expendedoras o conos de tráfico, ampliando las posibilidades jugables y aportando situaciones originales y divertidas.
                      </p>
                      <p>
                      El título fue muy bien recibido por la crítica gracias a su diseño accesible, su apartado artístico colorido y su equilibrio entre desafío y entretenimiento, consolidando a Kirby como una de las franquicias más sólidas de Nintendo.
                      </p>
                  </div>
              </div>
          </div>
        </div>

    </>
  );
}

export default Blog;