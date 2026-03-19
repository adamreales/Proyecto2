import "./Blog.css";
import { useTranslation } from "react-i18next";

function Blog() {
  const { t } = useTranslation();

  return (
    <>
      <div className="pagina-blog">
        <h2>{t("blog.title")}</h2>

        <div className="blog-container">

          {/* POST 1 */}
          <div className="post-blog">
            <div className="img-post">
              <img src="http://zent.es/imagenes_producto/gta6.webp" alt="Post GTA 6" />
            </div>

            <div className="contenido-post">
              <h3>{t("blog.post1.title")}</h3>
              <p>{t("blog.post1.p1")}</p>
              <p>{t("blog.post1.p2")}</p>
            </div>
          </div>

          <hr />

          {/* POST 2 */}
          <div className="post-blog">
            <div className="img-post">
              <img src="http://zent.es/imagenes_producto/crisol.jpg" alt="Post Crisol" />
            </div>

            <div className="contenido-post">
              <h3>{t("blog.post2.title")}</h3>
              <p>{t("blog.post2.p1")}</p>
              <p>{t("blog.post2.p2")}</p>
            </div>
          </div>

          <hr />

          {/* POST 3 */}
          <div className="post-blog">
            <div className="img-post">
              <img src="http://zent.es/imagenes_producto/pokemon.png" alt="Post Pokémon" />
            </div>

            <div className="contenido-post">
              <h3>{t("blog.post3.title")}</h3>
              <p>{t("blog.post3.p1")}</p>
              <p>{t("blog.post3.p2")}</p>
              <p>{t("blog.post3.p3")}</p>
            </div>
          </div>

          <hr />

          {/* POST 4 */}
          <div className="post-blog">
            <div className="img-post">
              <img src="http://zent.es/imagenes_producto/marioodyssy.jpg" alt="Post Mario" />
            </div>

            <div className="contenido-post">
              <h3>{t("blog.post4.title")}</h3>
              <p>{t("blog.post4.p1")}</p>
              <p>{t("blog.post4.p2")}</p>
              <p>{t("blog.post4.p3")}</p>
            </div>
          </div>

          <hr />

          {/* POST 5 */}
          <div className="post-blog">
            <div className="img-post">
              <img src="http://zent.es/imagenes_producto/kirby.jpg" alt="Post Kirby" />
            </div>

            <div className="contenido-post">
              <h3>{t("blog.post5.title")}</h3>
              <p>{t("blog.post5.p1")}</p>
              <p>{t("blog.post5.p2")}</p>
              <p>{t("blog.post5.p3")}</p>
              <p>{t("blog.post5.p4")}</p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Blog;