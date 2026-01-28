import "./Login.css";
import { useState } from "react";
import { login } from "../../services/auth";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      console.log("Usuario:", data.user);
    } catch (error) {
      alert("Login incorrecto: " + error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="titulo-login">Inicia sesión</h1>
        <Link to="/home"><button className="btn-volver"><img src="public/imagesideas/logo.png" alt="Logo" /></button></Link>
        <form className="formulario" onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="Botones">
            <button type="submit" className="btn-login">
                Iniciar sesión
            </button>
             <Link to="/register"> <button type="submit" className="btn-registro">Registrate</button></Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
