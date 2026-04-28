import "./ResetPassword.less";
import { useState, useEffect } from "react";
import { resetear_contraseña } from "../../services/auth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenValido, setTokenValido] = useState(true);

  useEffect(() => {
    const emailParam = searchParams.get("email");
    const tokenParam = searchParams.get("token");

    if (!emailParam || !tokenParam) {
      setError(t("resetPassword.invalidLink"));
      setTokenValido(false);
      return;
    }

    setEmail(emailParam);
    setToken(tokenParam);
  }, [searchParams, t]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");
    setLoading(true);

    try {
      if (password.length < 8) {
        setError(t("resetPassword.passwordTooShort"));
        setLoading(false);
        return;
      }

      if (password !== password_confirmation) {
        setError(t("resetPassword.passwordsMismatch"));
        setLoading(false);
        return;
      }

      const data = await resetear_contraseña(email, token, password, password_confirmation);

      setMensaje(t("resetPassword.success"));
      setPassword("");
      setPasswordConfirmation("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError(t("resetPassword.updateError"));
      }
    } finally {
      setLoading(false);
    }
  };

  if (!tokenValido) {
    return (
      <div className="reset-password-page">
        <div className="reset-password-container">
          <h1 className="titulo">{t("resetPassword.title")}</h1>
          <div className="error-container">
            <span className="error-icon">error_outline</span>
            <p className="error-message">{error}</p>
            <Link to="/forgot-password"><button className="btn">{t("resetPassword.requestNewLink")}</button></Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reset-password-page">
      <div className="reset-password-container">
        <h1 className="titulo-reset-password">{t("resetPassword.titleNew")}</h1>

        <form className="formulario-reset-password" onSubmit={handleSubmit}>
          <p className="email-info">
            <strong>{t("resetPassword.emailLabel")}:</strong> {email}
          </p>

          <div className="password-wrapper">
            <label htmlFor="password-nueva">{t("resetPassword.newPasswordLabel")}</label>
            <div className="password-row">
              <input
                id="password-nueva"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyUp={(e) => setCapsLock(e.getModifierState("CapsLock"))}
                onFocus={(e) => setCapsLock(e.getModifierState("CapsLock"))}
                onBlur={() => setCapsLock(false)}
                placeholder={t("resetPassword.newPasswordPlaceholder")}
                required
                disabled={loading}
              />
              <button
                type="button"
                className="btn-ojo"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? t("resetPassword.hidePassword") : t("resetPassword.showPassword")}
                disabled={loading}
              >
                <span className="material-symbols-outlined">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          <div className="password-wrapper">
            <label htmlFor="password-confirmacion">{t("resetPassword.confirmPasswordLabel")}</label>
            <div className="password-row">
              <input
                id="password-confirmacion"
                type={showPassword2 ? "text" : "password"}
                value={password_confirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                onKeyUp={(e) => setCapsLock(e.getModifierState("CapsLock"))}
                onFocus={(e) => setCapsLock(e.getModifierState("CapsLock"))}
                onBlur={() => setCapsLock(false)}
                placeholder={t("resetPassword.confirmPasswordPlaceholder")}
                required
                disabled={loading}
              />
              <button
                type="button"
                className="btn-ojo"
                onClick={() => setShowPassword2(!showPassword2)}
                aria-label={showPassword2 ? t("resetPassword.hidePassword") : t("resetPassword.showPassword")}
                disabled={loading}
              >
                <span className="material-symbols-outlined">
                  {showPassword2 ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          {capsLock && (
            <p className="aviso-capslock">
              <span className="material-symbols-outlined aviso-icon">keyboard_capslock</span>
              {t("resetPassword.capsLock")}
            </p>
          )}

          {error && <div className="mensaje-error">{error}</div>}
          {mensaje && <div className="mensaje-exito">{mensaje}</div>}

          <div className="botones-reset">
            <button type="submit" className="btn-actualizar" disabled={loading}>
              {loading ? t("resetPassword.updating") : t("resetPassword.update")}
            </button>
            <Link to="/login"><button type="button" className="btn-cancelar" disabled={loading}>{t("resetPassword.cancel")}</button></Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
