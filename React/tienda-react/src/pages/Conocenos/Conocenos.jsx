import "./Conocenos.css";
import 'leaflet/dist/leaflet.css';
import Mapa from "../../components/Mapa/Mapa";
import { useTranslation } from "react-i18next";

function Conocenos() {

  const { t } = useTranslation();

  return (
    <>
      <div className="Titulo">
        <h2>{t("about.title")}</h2>
      </div>

      <main>

        <article className="Fundacion">

          <div className="Imagenes tienda">
            <img
              src="http://zent.es/imagenes_producto/conocenos1.jpeg"
              alt="Tienda Zent"
            />
          </div>

          <div className="texto-fundacion">
            <p>{t("about.foundation1")}</p>
          </div>

        </article>

        <article className="Fundacion">

          <div className="texto-fundacion">
            <p>{t("about.foundation2")}</p>
          </div>

          <div className="Imagenes tienda">
            <img
              src="http://zent.es/imagenes_producto/conocenos2.jpeg"
              alt="Setup gaming Zent"
            />
          </div>

        </article>

        <article className="Fundadores">

          <div className="Co-fundador">

            <div className="Imagen">
              <img src="http://zent.es/imagenes_producto/Adam.png" alt="Adam Reales" />
            </div>

            <div className="descripcion">
              <h2>{t("about.adamRole")}</h2>
              <p>{t("about.adamBio")}</p>
            </div>

          </div>

        </article>

        <article className="Fundadores">

          <div className="Co-fundador cofundador-adrian">

            <div className="Imagen">
              <img src="http://zent.es/imagenes_producto/Adrian.png" alt="Adrián" />
            </div>

            <div className="descripcion">
              <h2>{t("about.adrianRole")}</h2>
              <p>{t("about.adrianBio")}</p>
            </div>

          </div>

        </article>

        <Mapa />

      </main>
    </>
  );
}

export default Conocenos;