import "./Register.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../../services/auth";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(name,email, password);
      alert("Usuario registrado correctamente");
    } catch (error) {
      alert("Error al registrarse");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">

        <h1 className="titulo-login">Regístrate</h1>

        <Link to="/home"><button className="btn-volver"><img src="imagesideas/logo.png" alt="Logo" /></button></Link>

        <form className="formulario" onSubmit={handleSubmit}>
          <label>Nombre:</label>
          <input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          
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

          <label>Confirmar contraseña:</label>
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />

          <div className="Botones">
            <button type="submit" className="btn-registro">
              Registrarse
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default Register;
