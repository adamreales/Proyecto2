import "./Conocenos.css";


function Conocenos() {
  return (
    <>
      <div className="Titulo">
        <h1>
          Quienes <span>SOMOS</span>?
        </h1>
      </div>

      <main>
        <article className="Fundacion">
          <div className="Imagenes tienda">
            <img
              src="/imagesideas/conocenos1.jpeg"
              alt="Tienda Zent"
            />
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
            <img
              src="/imagesideas/conocenos2.jpeg"
              alt="Setup gaming Zent"
            />
          </div>
        </article>
      </main>
    </>
  );
}

export default Conocenos;
