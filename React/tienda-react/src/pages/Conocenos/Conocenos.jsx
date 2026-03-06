import "./Conocenos.css";


function Conocenos() {
  return (
    <>
      <div className="Titulo">
        <h2>
            ¿QUIENES SOMOS?
        </h2>
      </div>

      <main>
        <article className="Fundacion">
          <div className="Imagenes tienda">
            <img src="http://zent.es/imagenes_producto/conocenos1.jpeg"alt="Tienda Zent"/> 
          </div>

          <div className="texto-fundacion">
            <p>
              Somos Zent, una empresa fundada por dos jóvenes programadores con
              una fuerte pasión por la tecnología, el mundo del gaming y el
              rendimiento digital. Creamos Zent con el objetivo de ofrecer
              productos de ordenador y accesorios tecnológicos pensados para
              usuarios que buscan mejorar su experiencia y su productividad en
              el día a día. Nos inspiramos en los mejores jugadores gaming, en su
              mentalidad de mejora constante y en la importancia de contar con el
              equipo adecuado para rendir al máximo.
            </p>
          </div>
        </article>

        <article className="Fundacion">
          <div className="texto-fundacion">
            <p>
              Por eso seleccionamos cuidadosamente cada producto, priorizando
              calidad, funcionalidad y diseño moderno. En Zent no solo vendemos
              tecnología: construimos una experiencia enfocada en el
              rendimiento, la comodidad y la optimización del entorno digital,
              tanto para jugar como para trabajar. Creemos que un buen setup
              marca la diferencia, y nuestra misión es ayudarte a crear el tuyo.
            </p>
          </div>

          <div className="Imagenes tienda">
            <img src="http://zent.es/imagenes_producto/conocenos2.jpeg"alt="Setup gaming Zent"/>
          </div>
        </article>

        <article className="Fundadores">
           <div className="Co-fundador">
             <div className="Imagen">
                <img src="http://zent.es/imagenes_producto/Adam.png" />
              </div>
              <div className="descripcion">
                <h2>Adam Reales — Cofundador & Lead Frontend Engineer</h2>
                <p>
                    Adam Reales es cofundador de ZENT, una plataforma especializada en comercio digital de videojuegos y contenido informativo del sector gaming, concebida para integrar tienda online, actualidad y comunidad en un mismo ecosistema. <br/>Como Desarrollador de Aplicaciones Web, ha liderado toda la concepción técnica y estratégica del frontend de la plataforma.<br/>
                    Desde las fases iniciales del proyecto, Adam ha sido responsable de la definición del naming de la marca, la arquitectura de la interfaz, el diseño de experiencia de usuario (UX/UI) y la implementación del cliente web utilizando React, apostando por una arquitectura moderna basada en componentes y orientada al rendimiento y la escalabilidad.<br/>
                    Además de la capa visual de la plataforma, también ha gestionado la infraestructura inicial del proyecto, incluyendo la adquisición y configuración del hosting, la optimización del despliegue de la aplicación y la planificación de la estrategia de presencia digital y crecimiento en redes sociales. <br/>Su enfoque combina desarrollo, producto y visión estratégica, impulsando la identidad digital de ZENT desde su origen.
                </p>
              </div>
           </div>
        </article>
          <article className="Fundadores">
            <div className="Co-fundador cofundador-adrian">
             <div className="Imagen">
                <img src="http://zent.es/imagenes_producto/Adrian.png" />
              </div>
              <div className="descripcion">
                <h2>Adrián — Cofundador & Backend Engineer</h2>
                <p>
                    Adrián, también cofundador de ZENT, es el responsable de la arquitectura backend y la lógica de negocio que sustenta la plataforma.<br/> Como Desarrollador de Aplicaciones Web, ha diseñado y desarrollado la infraestructura del sistema con un enfoque en robustez, seguridad y escalabilidad.<br/>
                    El backend de la plataforma ha sido implementado utilizando PHP con el framework Laravel, integrando Filament para la construcción de un panel administrativo avanzado que permite la gestión eficiente de productos, usuarios, contenido y operaciones internas de la plataforma.<br/>
                    Entre sus responsabilidades destacan el diseño del modelo de datos, la creación y optimización de la base de datos, la implementación de APIs y servicios internos, así como la estructuración de la lógica de negocio que conecta la tienda online, el sistema de gestión y la plataforma de contenidos.<br/>
                </p>
              </div>
           </div>
        </article>

        
      </main>
    </>
    )}
export default Conocenos;
