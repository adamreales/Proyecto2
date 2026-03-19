import "./ValoracionesUsuarios.less";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function ValoracionesUsuarios({ producto }) {

  const { t, i18n } = useTranslation();

  const [pagina, setPagina] = useState(0);
  const [comentariosTraducidos, setComentariosTraducidos] = useState({});
  const MaxValoraciones = 6;

  const inicio = pagina * MaxValoraciones;
  const fin = inicio + MaxValoraciones;

  function estrellas(n) {
    return "⭐".repeat(n);
  }

  useEffect(() => {
    const valoraciones = producto?.do_valoraciones || [];

    if (!valoraciones.length) {
      setComentariosTraducidos({});
      return;
    }

    if (i18n.language === "es") {
      const originales = {};
      valoraciones.forEach((valoracion, index) => {
        originales[index] = valoracion.comentario || "";
      });
      setComentariosTraducidos(originales);
      return;
    }

    const targetLanguage = i18n.language === "cat" ? "ca" : i18n.language;
    let cancelado = false;

    const traducirValoraciones = async () => {
      const traducciones = {};

      await Promise.all(
        valoraciones.map(async (valoracion, index) => {
          const comentario = valoracion.comentario?.trim();

          if (!comentario) {
            traducciones[index] = "";
            return;
          }

          try {
            const response = await fetch(
              `https://api.mymemory.translated.net/get?q=${encodeURIComponent(comentario)}&langpair=es|${targetLanguage}`
            );

            const data = await response.json();
            traducciones[index] = data?.responseData?.translatedText || comentario;
          } catch (error) {
            console.error("Error al traducir valoración:", error);
            traducciones[index] = comentario;
          }
        })
      );

      if (!cancelado) {
        setComentariosTraducidos(traducciones);
      }
    };

    traducirValoraciones();

    return () => {
      cancelado = true;
    };
  }, [producto?.do_valoraciones, i18n.language]);

  return (
    <div className="valoraciones-container">

      <div className="valoraciones-header">
        <h2>{t("reviews.userTitle")}</h2>

        <div className="valoraciones-botones">

          <button
            className="btn-prev-val"
            onClick={() => setPagina(pagina - 1)}
            disabled={pagina === 0}
          >
            <img
              src="http://zent.es/imagenes_producto/correrizq.png"
              className="mario"
              alt={t("common.previous")}
            />
          </button>

          <button
            className="btn-next-val"
            onClick={() => setPagina(pagina + 1)}
            disabled={fin >= producto.do_valoraciones.length}
          >
            <img
              src="http://zent.es/imagenes_producto/correr.png"
              className="mario mario-right"
              alt={t("common.next")}
            />
          </button>

        </div>
      </div>

      <div className="valoraciones-list">
        {producto.do_valoraciones.slice(inicio, fin).map((valoracion, index) => (
          
          <div className="valoracion-box" key={index}>

            <div className="valoracion-datos">
              <p>
                {t("reviews.name")} : {valoracion.name}
              </p>

              <p>{estrellas(valoracion.estrellas)}</p>
            </div>

            <p>{comentariosTraducidos[inicio + index] || valoracion.comentario}</p>

          </div>

        ))}
      </div>

    </div>
  );
}

export default ValoracionesUsuarios;