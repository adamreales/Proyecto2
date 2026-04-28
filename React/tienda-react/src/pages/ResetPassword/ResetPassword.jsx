import "./ResetPassword.less";
import { useState, useEffect } from "react";
import { resetear_contraseña } from "../../services/auth";
import { useNavigate, useSearchParams, Link } from "react-router-dom";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

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

  const [strength, setStrength] = useState(0);
  const [passwordErrors, setPasswordErrors] = useState([]);

  const strengthText = ["", "Muy débil", "Débil", "Media", "Fuerte"];

  useEffect(() => {
    const emailParam = searchParams.get("email");
    const tokenParam = searchParams.get("token");

    if (!emailParam || !tokenParam) {
      setError("Enlace de recuperación no válido");
      setTokenValido(false);
      return;
    }

    setEmail(emailParam);
    setToken(tokenParam);
  }, [searchParams]);

  // 🔐 VALIDACIÓN PASSWORD (igual que Register)
  const handlePasswordChange = (value) => {
    let errors = [];
    let score = 0;

    if (value.length >= 8) {
      errors.push("✔️ Minimo 8 caracteres");
      score++;
    } else {
      errors.push("❌ Mínimo 8 caracteres");
    }

    if (/[A-Z]/.test(value)) {
      errors.push("✔️ Debe tener una mayúscula");
      score++;
    } else {
      errors.push("❌ Debe tener una mayúscula");
    }

    if (/[0-9]/.test(value)) {
      errors.push("✔️ Debe tener un número");
      score++;
    } else {
      errors.push("❌ Debe tener un número");
    }

    if (/[\W_]/.test(value)) {
      errors.push("✔️ Debe tener un símbolo");
      score++;
    } else {
      errors.push("❌ Debe tener un símbolo");
    }

    setStrength(score);
    setPasswordErrors(errors);
    setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");
    setLoading(true);

    // validación fuerte
    if (strength < 4) {
      setError("La contraseña no cumple los requisitos");
      setLoading(false);
      return;
    }

    if (password !== password_confirmation) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    try {
      await resetear_contraseña(email, token, password, password_confirmation);

      setMensaje("Contraseña actualizada correctamente. Redirigiendo...");
      setPassword("");
      setPasswordConfirmation("");
      setStrength(0);

      setTimeout(() => navigate("/login"), 2000);

    } catch (error) {
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError("Error al resetear la contraseña.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!tokenValido) {
    return (
      <div className="reset-password-page">
        <div className="reset-password-container">
          <h1>Recuperar Contraseña</h1>
          <p>{error}</p>
          <Link to="/forgot-password">
            <button>Solicitar Nuevo Enlace</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="reset-password-page">
      <div className="reset-password-container">
        <h1>Establecer Nueva Contraseña</h1>

        <form onSubmit={handleSubmit}>
          <p><strong>Email:</strong> {email}</p>

          {/* PASSWORD */}
          <div className="password-wrapper">
            <label>Nueva Contraseña</label>

            <div className="password-row">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                onKeyUp={(e) => setCapsLock(e.getModifierState("CapsLock"))}
                placeholder="Nueva contraseña"
                disabled={loading}
              />

              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>

            {/* 🔥 BARRA SEGURIDAD */}
            {password && (
              <div className="estado_contra">
                <p>{strengthText[strength]}</p>

                <div className="strength-bar">
                  <div
                    className="strength-fill"
                    style={{
                      width: `${(strength / 4) * 100}%`,
                      background:
                        strength === 1 ? "red" :
                        strength === 2 ? "orange" :
                        strength === 3 ? "yellowgreen" :
                        strength === 4 ? "green" :
                        "transparent"
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

          {/* CONFIRM PASSWORD */}
          <div className="password-wrapper">
            <label>Confirmar Contraseña</label>

            <div className="password-row">
              <input
                type={showPassword2 ? "text" : "password"}
                value={password_confirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                placeholder="Confirmar contraseña"
                disabled={loading}
              />

              <button type="button" onClick={() => setShowPassword2(!showPassword2)}>
                {showPassword2 ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {capsLock && <p>⚠️ Mayúsculas activadas</p>}
          {error && <p className="error-msg">{error}</p>}
          {mensaje && <p className="ok-msg">{mensaje}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Actualizando..." : "Actualizar contraseña"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;