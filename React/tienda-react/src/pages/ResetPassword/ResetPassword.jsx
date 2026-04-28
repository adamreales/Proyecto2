import "./ResetPassword.less";
import { useState, useEffect } from "react";
import { resetear_contraseña } from "../../services/auth";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [capsLock, setCapsLock] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenValido, setTokenValido] = useState(true);

  const [strength, setStrength] = useState(0);
  const [passwordErrors, setPasswordErrors] = useState([]);

  const strengthText = ["", "Muy debil", "Debil", "Media", "Fuerte"];

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

  const handlePasswordChange = (value) => {
    setPassword(value);

    const errors = [];
    let score = 0;

    if (value.length >= 8) {
      score += 1;
    } else {
      errors.push("Minimo 8 caracteres");
    }

    if (/[A-Z]/.test(value)) {
      score += 1;
    } else {
      errors.push("Incluye una mayuscula");
    }

    if (/[0-9]/.test(value)) {
      score += 1;
    } else {
      errors.push("Incluye un numero");
    }

    if (/[^A-Za-z0-9]/.test(value)) {
      score += 1;
    } else {
      errors.push("Incluye un simbolo");
    }

    setStrength(score);
    setPasswordErrors(errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");
    setLoading(true);

    try {
      if (password.length < 8) {
        setError(t("resetPassword.passwordTooShort"));
        return;
      }

      if (password !== passwordConfirmation) {
        setError(t("resetPassword.passwordsMismatch"));
        return;
      }

      await resetear_contraseña(email, token, password, passwordConfirmation);

      setMensaje(t("resetPassword.success"));
      setPassword("");
      setPasswordConfirmation("");
      setStrength(0);
      setPasswordErrors([]);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
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
            <Link to="/forgot-password">
              <button className="btn">{t("resetPassword.requestNewLink")}</button>
            </Link>
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
                onChange={(e) => handlePasswordChange(e.target.value)}
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

            {password && (
              <div className="estado_contra">
                <p>{strengthText[strength]}</p>

                <div className="strength-bar">
                  <div
                    className="strength-fill"
                    style={{
                      width: `${(strength / 4) * 100}%`,
                      background:
                        strength === 1
                          ? "red"
                          : strength === 2
                            ? "orange"
                            : strength === 3
                              ? "yellowgreen"
                              : strength === 4
                                ? "green"
                                : "transparent",
                    }}
                  />
                </div>

                <div className="error">
                  {passwordErrors.map((err, i) => (
                    <p key={i}>{err}</p>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="password-wrapper">
            <label htmlFor="password-confirmacion">{t("resetPassword.confirmPasswordLabel")}</label>
            <div className="password-row">
              <input
                id="password-confirmacion"
                type={showPassword2 ? "text" : "password"}
                value={passwordConfirmation}
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
            <Link to="/login">
              <button type="button" className="btn-cancelar" disabled={loading}>
                {t("resetPassword.cancel")}
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
