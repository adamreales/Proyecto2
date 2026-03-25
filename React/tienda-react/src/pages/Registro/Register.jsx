import "./Register.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../../services/auth";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const [capsLockConfirm, setCapsLockConfirm] = useState(false);

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

        <Link to="/home"><button className="btn-volver"><img src="http://zent.es/imagenes_producto/Logo.png" alt="Logo" /></button></Link>

        <form className="formulario" onSubmit={handleSubmit}>
         
          <input type="text" className="caixa" value={name}onChange={(e) => setName(e.target.value)} placeholder="Nombre :"/>
          
   
          <input type="email" className="caixa" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email : " />

          <div className="password-wrapper">
            <div className="password-row">
              <input
                type={showPassword ? "text" : "password"} className="caixa"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyUp={(e) => setCapsLock(e.getModifierState("CapsLock"))}
                onFocus={(e) => setCapsLock(e.getModifierState("CapsLock"))}
                onBlur={() => setCapsLock(false)}
                placeholder="Contraseña : "
              />
              <button
                type="button"
                className="btn-ojo"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                <span className="material-symbols-outlined">{showPassword ? "visibility_off" : "visibility"}</span>
              </button>
            </div>
            {capsLock && (
              <p className="aviso-capslock">
                <span className="material-symbols-outlined aviso-icon">keyboard_capslock</span>
                Mayúsculas activadas
              </p>
            )}
          </div>

          <div className="password-wrapper">
            <div className="password-row">
              <input
                type={showPasswordConfirm ? "text" : "password"} className="caixa"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                onKeyUp={(e) => setCapsLockConfirm(e.getModifierState("CapsLock"))}
                onFocus={(e) => setCapsLockConfirm(e.getModifierState("CapsLock"))}
                onBlur={() => setCapsLockConfirm(false)}
                placeholder="Confirmar contraseña : "
              />
              <button
                type="button"
                className="btn-ojo"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                aria-label={showPasswordConfirm ? "Ocultar confirmación" : "Mostrar confirmación"}
              >
                <span className="material-symbols-outlined">{showPasswordConfirm ? "visibility_off" : "visibility"}</span>
              </button>
            </div>
            {capsLockConfirm && (
              <p className="aviso-capslock">
                <span className="material-symbols-outlined aviso-icon">keyboard_capslock</span>
                Mayúsculas activadas
              </p>
            )}
          </div>

          <div className="Botones">
            <button type="submit" className="btn-registro"> Registrarse</button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default Register;
