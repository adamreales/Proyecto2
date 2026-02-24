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
      await register(name,email, password,passwordConfirm);
      alert("Usuario registrado correctamente");
    } catch (error) {
      alert("Error al registrarse");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">

        <h1 className="titulo-login">Regístrate</h1>

        <Link to="/home"><button className="btn-volver"><img src="public/imagesideas/logo.png" alt="Logo" /></button></Link>

        <form className="formulario" onSubmit={handleSubmit}>
         
          <input type="text" value={name}onChange={(e) => setName(e.target.value)} placeholder="Nombre :"/>
          
   
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email : " />

          <input  type="password"value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña : "/>
 
          <input type="password" value={passwordConfirm}  onChange={(e) => setPasswordConfirm(e.target.value)}placeholder="Confirmar contraseña : " />

          <div className="Botones">
            <button type="button" className="btn-registro"> Registrarse</button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default Register;
