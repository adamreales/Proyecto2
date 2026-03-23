import "./ChangePassword.css";
import { useState } from "react";
import { cambiarContraseña } from "../../services/auth";
import { useNavigate } from "react-router-dom";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");
    setLoading(true);

    try {
      // Validar que las contraseñas nuevas coincidan
      if (passwordNueva !== passwordConfirmacion) {
        setError("Las contraseñas nuevas no coinciden");
        setLoading(false);
        return;
      }

      // Validar longitud mínima
      if (passwordNueva.length < 8) {
        setError("La contraseña debe tener al menos 8 caracteres");
        setLoading(false);
        return;
      }

      const data = await cambiarContraseña(
        passwordActual,
        passwordNueva,
        passwordConfirmacion
      );

      setMensaje("Contraseña actualizada correctamente");
      setPasswordActual("");
      setPasswordNueva("");
      setPasswordConfirmacion("");

      // Redirigir a home después de 2 segundos
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError("Error al cambiar la contraseña. Intenta de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="change-password-page">
      <div className="change-password-container">
        <h1 className="titulo-change-password">Cambiar Contraseña</h1>

        <form className="formulario-change-password" onSubmit={handleSubmit}>
          {/* Contraseña Actual */}
          <div className="password-wrapper">
            <label htmlFor="password-actual">Contraseña Actual</label>
            <div className="password-row">
              <input
                id="password-actual"
                type={showPasswordActual ? "text" : "password"}
                value={passwordActual}
                onChange={(e) => setPasswordActual(e.target.value)}
                onKeyUp={(e) => setCapsLock(e.getModifierState("CapsLock"))}
                onFocus={(e) => setCapsLock(e.getModifierState("CapsLock"))}
                onBlur={() => setCapsLock(false)}
                placeholder="Ingresa tu contraseña actual"
                required
              />
              <button
                type="button"
                className="btn-ojo"
                onClick={() => setShowPasswordActual(!showPasswordActual)}
                aria-label={showPasswordActual ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                <span className="material-symbols-outlined">
                  {showPasswordActual ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          {/* Contraseña Nueva */}
          <div className="password-wrapper">
            <label htmlFor="password-nueva">Contraseña Nueva</label>
            <div className="password-row">
              <input
                id="password-nueva"
                type={showPasswordNueva ? "text" : "password"}
                value={passwordNueva}
                onChange={(e) => setPasswordNueva(e.target.value)}
                onKeyUp={(e) => setCapsLock(e.getModifierState("CapsLock"))}
                onFocus={(e) => setCapsLock(e.getModifierState("CapsLock"))}
                onBlur={() => setCapsLock(false)}
                placeholder="Ingresa tu nueva contraseña"
                required
              />
              <button
                type="button"
                className="btn-ojo"
                onClick={() => setShowPasswordNueva(!showPasswordNueva)}
                aria-label={showPasswordNueva ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                <span className="material-symbols-outlined">
                  {showPasswordNueva ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          {/* Confirmación de Contraseña Nueva */}
          <div className="password-wrapper">
            <label htmlFor="password-confirmacion">Confirmar Contraseña Nueva</label>
            <div className="password-row">
              <input
                id="password-confirmacion"
                type={showPasswordConfirmacion ? "text" : "password"}
                value={passwordConfirmacion}
                onChange={(e) => setPasswordConfirmacion(e.target.value)}
                onKeyUp={(e) => setCapsLock(e.getModifierState("CapsLock"))}
                onFocus={(e) => setCapsLock(e.getModifierState("CapsLock"))}
                onBlur={() => setCapsLock(false)}
                placeholder="Confirma tu nueva contraseña"
                required
              />
              <button
                type="button"
                className="btn-ojo"
                onClick={() => setShowPasswordConfirmacion(!showPasswordConfirmacion)}
                aria-label={showPasswordConfirmacion ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                <span className="material-symbols-outlined">
                  {showPasswordConfirmacion ? "visibility_off" : "visibility"}
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

          {/* Mensajes de Error o Éxito */}
          {error && <div className="mensaje-error">{error}</div>}
          {mensaje && <div className="mensaje-exito">{mensaje}</div>}

          {/* Botones */}
          <div className="botones">
            <button type="submit" className="btn-cambiar" disabled={loading}>
              {loading ? "Cambiando..." : "Cambiar Contraseña"}
            </button>
            <button
              type="button"
              className="btn-cancelar"
              onClick={() => navigate("/home")}
              disabled={loading}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
