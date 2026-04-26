import "./Login.css";
import { useState } from "react";
import { login } from "../../services/auth";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      console.log("Usuario:", data.user);
      navigate("/home");
    } catch (error) {
      document.getElementById("aviso").textContent = "Password o email incorrecto";
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="titulo-login">Inicia sesión</h1>
        <Link to="/home"><button className="btn-volver"><img src="http://zent.es/imagenes_producto/Logo.png" alt="Logo" /></button></Link>
        <form className="formulario" onSubmit={handleSubmit}>
          <input className="caixa"  type="email"value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email : " />
          <div className="password-wrapper">
            <div className="password-row">
              <input className="caixa" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} onKeyUp={(e) => setCapsLock(e.getModifierState("CapsLock"))} onFocus={() => setCapsLock(false)} placeholder="Contraseña : "/>

              <button type="button" className="btn-ojo" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}>
                <span className="material-symbols-outlined">{showPassword ? "visibility_off" : "visibility"}</span>
              </button>
            </div>
            {capsLock && (
              <p className="aviso-capslock"><span className="material-symbols-outlined aviso-icon">keyboard_capslock</span>   Mayúsculas activadas</p>
            )}
            <span id="aviso" className="aviso"></span>
          </div>
          <Link to="/forgot-password" style={{ textDecoration: "none" }}>
            ¿Olvidaste tu contraseña?
          </Link>
          <div className="Botones">
            <button type="submit" className="btn-login"> Iniciar sesión </button>
             <Link to="/register"> <button type="button" className="btn-registro">Registrate</button></Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
