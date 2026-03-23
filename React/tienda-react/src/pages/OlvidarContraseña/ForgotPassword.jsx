import "./ForgotPassword.less";
import { useState } from "react";
import { solicitar_recuperacion } from "../../services/auth";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");
    setLoading(true);

    try {
      if (!email || !email.includes("@")) {
        setError("Por favor ingresa un email válido");
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
        setError("Error al procesar tu solicitud. Intenta de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="paginareinicio">
      <div className="forgot-password-container">
        <h1 className="titulo">Recuperar Contraseña</h1>

        {!enviado ? (
          <form className="formulario" onSubmit={handleSubmit}>
            <p className="descripcion"> Ingresa tu email y te enviaremos un enlace para recuperar tu contraseña.</p>

            <div className="email">
              <label htmlFor="email">Email</label>
              <input id="email"   type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" required disabled={loading} />
            </div>

            {error && <div className="mensaje-error">{error}</div>}

            <div className="botones">
              <button type="submit" className="btn-enviar" disabled={loading}>{loading ? "Enviando..." : "Enviar Enlace"}</button>
              <Link to="/login"><button type="button" className="btn-volver"> Volver a Iniciar Sesión</button></Link>
            </div>
          </form>
        ) : (
          <div className="confirmacion-enviada">
            <div className="icono-exito">
              <span className="material-symbols-outlined">mail_outline</span>
            </div>
            <h2>Correo Enviado</h2>
            <p className="mensaje-confirmacion">{mensaje}</p>
            <p className="instrucciones">
              Revisa tu bandeja de entrada y haz clic en el enlace para establecer una nueva contraseña.
              <br />
              <strong>El enlace expirará en 1 hora.</strong>
            </p>
            <Link to="/login"><button className="btn-ir-login">Ir a Iniciar Sesión</button> </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
