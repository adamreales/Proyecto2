import "./ForgotPassword.less";
import { useState } from "react";
import { solicitar_recuperacion } from "../../services/auth";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");
    setLoading(true);

    try {
      if (!email || !email.includes("@")) {
        setError(t("forgotPassword.emailInvalid"));
        setLoading(false);
        return;
      }

      const data = await solicitar_recuperacion(email);
      
      setMensaje(data.msg);
      setEnviado(true);
      setEmail("");
    } catch (error) {
      console.error("Error:", error);
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError(t("forgotPassword.sendError"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="paginareinicio">
      <div className="forgot-password-container">
        <h1 className="titulo">{t("forgotPassword.title")}</h1>

        {!enviado ? (
          <form className="formulario" onSubmit={handleSubmit}>
            <p className="descripcion">{t("forgotPassword.description")}</p>

            <div className="email">
              <label htmlFor="email">{t("forgotPassword.emailLabel")}</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("forgotPassword.emailPlaceholder")} required disabled={loading} />
            </div>

            {error && <div className="mensaje-error">{error}</div>}

            <div className="botones">
              <button type="submit" className="btn-enviar" disabled={loading}>{loading ? t("forgotPassword.sending") : t("forgotPassword.sendLink")}</button>
              <Link to="/login"><button type="button" className="btn-volver">{t("forgotPassword.backToLogin")}</button></Link>
            </div>
          </form>
        ) : (
          <div className="confirmacion-enviada">
            <div className="icono-exito">
              <span className="material-symbols-outlined">mail_outline</span>
            </div>
            <h2>{t("forgotPassword.emailSentTitle")}</h2>
            <p className="mensaje-confirmacion">{mensaje}</p>
            <p className="instrucciones">
              {t("forgotPassword.instructions")}
              <br />
              <strong>{t("forgotPassword.expiresNote")}</strong>
            </p>
            <Link to="/login"><button className="btn-ir-login">{t("forgotPassword.goToLogin")}</button></Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
