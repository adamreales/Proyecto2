import "./ResetPassword.less";
import { useState, useEffect } from "react";
import { resetear_contraseña } from "../../services/auth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    // Obtener token y email de los parámetros URL
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");
    setLoading(true);

    try {
      // Validaciones
      if (password.length < 8) {
        setError("La contraseña debe tener al menos 8 caracteres");
        setLoading(false);
        return;
      }

      if (password !== password_confirmation) {
        setError("Las contraseñas no coinciden");
        setLoading(false);
        return;
      }

      const data = await resetear_contraseña(email, token, password, password_confirmation);

      setMensaje("Contraseña actualizada correctamente. Redirigiendo...");
      setPassword("");
      setPasswordConfirmation("");

      // Redirigir a login después de 2 segundos
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError("Error al resetear la contraseña. Intenta de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!tokenValido) {
    return (
      <div className="reset-password-page">
        <div className="reset-password-container">
          <h1 className="titulo">Recuperar Contraseña</h1>
          <div className="error-container">
            <span className="error-icon">error_outline</span>
            <p className="error-message">{error}</p>
            <Link to="/forgot-password"> <button className="btn">Solicitar Nuevo Enlace</button>  </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reset-password-page">
      <div className="reset-password-container">
        <h1 className="titulo-reset-password">Establecer Nueva Contraseña</h1>

        <form className="formulario-reset-password" onSubmit={handleSubmit}>
          <p className="email-info">
            <strong>Email:</strong> {email}
          </p>

          {/* Contraseña Nueva */}
          <div className="password-wrapper">
            <label htmlFor="password-nueva">Nueva Contraseña</label>
            <div className="password-row">
              <input
                id="password-nueva"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyUp={(e) => setCapsLock(e.getModifierState("CapsLock"))}
                onFocus={(e) => setCapsLock(e.getModifierState("CapsLock"))}
                onBlur={() => setCapsLock(false)}
                placeholder="Mínimo 8 caracteres"
                required
                disabled={loading}
              />
              <button
                type="button"
                className="btn-ojo"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                disabled={loading}
              >
                <span className="material-symbols-outlined">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          {/* Confirmar Contraseña */}
          <div className="password-wrapper">
            <label htmlFor="password-confirmacion">Confirmar Contraseña</label>
            <div className="password-row">
              <input
                id="password-confirmacion"
                type={showPassword2 ? "text" : "password"}
                value={password_confirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                onKeyUp={(e) => setCapsLock(e.getModifierState("CapsLock"))}
                onFocus={(e) => setCapsLock(e.getModifierState("CapsLock"))}
                onBlur={() => setCapsLock(false)}
                placeholder="Repite tu nueva contraseña"
                required
                disabled={loading}
              />
              <button
                type="button"
                className="btn-ojo"
                onClick={() => setShowPassword2(!showPassword2)}
                aria-label={showPassword2 ? "Ocultar contraseña" : "Mostrar contraseña"}
                disabled={loading}
              >
                <span className="material-symbols-outlined">
                  {showPassword2 ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          {/* Alerta de Mayúsculas */}
          {capsLock && (
            <p className="aviso-capslock">
              <span className="material-symbols-outlined aviso-icon">keyboard_capslock</span>
              Mayúsculas activadas
            </p>
          )}

          {/* Mensajes */}
          {error && <div className="mensaje-error">{error}</div>}
          {mensaje && <div className="mensaje-exito">{mensaje}</div>}

          {/* Botones */}
          <div className="botones-reset">
            <button type="submit" className="btn-actualizar" disabled={loading}>
              {loading ? "Actualizando..." : "Actualizar Contraseña"}
            </button>
            <Link to="/login"><button type="button" className="btn-cancelar" disabled={loading}> Cancelar </button>   </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
