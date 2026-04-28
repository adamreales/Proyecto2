import "./ChangePassword.css";
import { useState } from "react";
import { cambiarContraseña } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ChangePassword() {
  const [passwordActual, setPasswordActual] = useState("");
  const [passwordNueva, setPasswordNueva] = useState("");
  const [passwordConfirmacion, setPasswordConfirmacion] = useState("");
  const [showPasswordActual, setShowPasswordActual] = useState(false);
  const [showPasswordNueva, setShowPasswordNueva] = useState(false);
  const [showPasswordConfirmacion, setShowPasswordConfirmacion] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");
    setLoading(true);

    try {
      if (passwordNueva !== passwordConfirmacion) {
        setError(t("changePassword.passwordsMismatch"));
        setLoading(false);
        return;
      }

      if (passwordNueva.length < 8) {
        setError(t("changePassword.passwordTooShort"));
        setLoading(false);
        return;
      }

      const data = await cambiarContraseña(
        passwordActual,
        passwordNueva,
        passwordConfirmacion
      );

      setMensaje(t("changePassword.success"));
      setPasswordActual("");
      setPasswordNueva("");
      setPasswordConfirmacion("");

      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError(t("changePassword.changeError"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="change-password-page">
      <div className="change-password-container">
        <h1 className="titulo-change-password">{t("changePassword.title")}</h1>

        <form className="formulario-change-password" onSubmit={handleSubmit}>
          <div className="password-wrapper">
            <label htmlFor="password-actual">{t("changePassword.currentPasswordLabel")}</label>
            <div className="password-row">
              <input
                id="password-actual"
                type={showPasswordActual ? "text" : "password"}
                value={passwordActual}
                onChange={(e) => setPasswordActual(e.target.value)}
                onKeyUp={(e) => setCapsLock(e.getModifierState("CapsLock"))}
                onFocus={(e) => setCapsLock(e.getModifierState("CapsLock"))}
                onBlur={() => setCapsLock(false)}
                placeholder={t("changePassword.currentPasswordPlaceholder")}
                required
              />
              <button
                type="button"
                className="btn-ojo"
                onClick={() => setShowPasswordActual(!showPasswordActual)}
                aria-label={showPasswordActual ? t("changePassword.hidePassword") : t("changePassword.showPassword")}
              >
                <span className="material-symbols-outlined">
                  {showPasswordActual ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          <div className="password-wrapper">
            <label htmlFor="password-nueva">{t("changePassword.newPasswordLabel")}</label>
            <div className="password-row">
              <input
                id="password-nueva"
                type={showPasswordNueva ? "text" : "password"}
                value={passwordNueva}
                onChange={(e) => setPasswordNueva(e.target.value)}
                onKeyUp={(e) => setCapsLock(e.getModifierState("CapsLock"))}
                onFocus={(e) => setCapsLock(e.getModifierState("CapsLock"))}
                onBlur={() => setCapsLock(false)}
                placeholder={t("changePassword.newPasswordPlaceholder")}
                required
              />
              <button
                type="button"
                className="btn-ojo"
                onClick={() => setShowPasswordNueva(!showPasswordNueva)}
                aria-label={showPasswordNueva ? t("changePassword.hidePassword") : t("changePassword.showPassword")}
              >
                <span className="material-symbols-outlined">
                  {showPasswordNueva ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          <div className="password-wrapper">
            <label htmlFor="password-confirmacion">{t("changePassword.confirmPasswordLabel")}</label>
            <div className="password-row">
              <input
                id="password-confirmacion"
                type={showPasswordConfirmacion ? "text" : "password"}
                value={passwordConfirmacion}
                onChange={(e) => setPasswordConfirmacion(e.target.value)}
                onKeyUp={(e) => setCapsLock(e.getModifierState("CapsLock"))}
                onFocus={(e) => setCapsLock(e.getModifierState("CapsLock"))}
                onBlur={() => setCapsLock(false)}
                placeholder={t("changePassword.confirmPasswordPlaceholder")}
                required
              />
              <button
                type="button"
                className="btn-ojo"
                onClick={() => setShowPasswordConfirmacion(!showPasswordConfirmacion)}
                aria-label={showPasswordConfirmacion ? t("changePassword.hidePassword") : t("changePassword.showPassword")}
              >
                <span className="material-symbols-outlined">
                  {showPasswordConfirmacion ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          {capsLock && (
            <p className="aviso-capslock">
              <span className="material-symbols-outlined aviso-icon">keyboard_capslock</span>
              {t("changePassword.capsLock")}
            </p>
          )}

          {error && <div className="mensaje-error">{error}</div>}
          {mensaje && <div className="mensaje-exito">{mensaje}</div>}

          <div className="botones">
            <button type="submit" className="btn-cambiar" disabled={loading}>
              {loading ? t("changePassword.changing") : t("changePassword.change")}
            </button>
            <button
              type="button"
              className="btn-cancelar"
              onClick={() => navigate("/home")}
              disabled={loading}
            >
              {t("changePassword.cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
