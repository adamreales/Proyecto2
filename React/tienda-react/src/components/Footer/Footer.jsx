import { useState } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");

  const enviarFormulario = async (e) => {
    e.preventDefault();

    let res = await fetch("http://127.0.0.1:8000/api/contacto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    let data = await res.json();
    console.log(data);
    setEmail("");
  };

  return (
    <footer>
      <div className="footer-container">

        <div className="footer-col">
          <h3>{t("footer.whoWeAre")}</h3>
          <ul>
            <li><Link to="/normas">{t("footer.aboutUs")}</Link></li>
            <li><Link to="/normas">{t("footer.careers")}</Link></li>
            <li><Link to="/normas">{t("footer.tour")}</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>{t("footer.support")}</h3>
          <ul>
            <li><Link to="/normas">{t("footer.affiliatePrograms")}</Link></li>
            <li><Link to="/normas">{t("footer.advertise")}</Link></li>
            <li><Link to="/normas">{t("footer.faq")}</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>{t("footer.partners")}</h3>
          <ul>
            <li><Link to="/normas">{t("footer.knowledgeBase")}</Link></li>
            <li><Link to="/normas">{t("footer.videoGuides")}</Link></li>
            <li><Link to="/normas">{t("footer.reportBug")}</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>{t("footer.legal")}</h3>
          <ul>
            <li><Link to="/normas">{t("footer.privacyPolicy")}</Link></li>
            <li><Link to="/normas">{t("footer.termsConditions")}</Link></li>
            <li><Link to="/normas">{t("footer.cookiePolicy")}</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>{t("footer.newsletter")}</h3>
          <form className="newsletter" onSubmit={enviarFormulario}>
            <input
              type="email"
              placeholder={t("footer.emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">→</button>
          </form>
        </div>

      </div>

      <div className="footer-bottom">
        <div className="social-icons">
          <img src="http://zent.es/imagenes_producto/Instagram.png" alt="Instagram" />
          <img src="http://zent.es/imagenes_producto/Twiter.png" alt="Twitter" />
          <img src="http://zent.es/imagenes_producto/facebook.png" alt="Facebook" />
        </div>

        <p>{t("footer.copyright")}</p>
      </div>
    </footer>
  );
}

export default Footer;