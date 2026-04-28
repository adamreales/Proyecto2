import "./Login.css";
import { useState } from "react";
import { login } from "../../services/auth";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const updateCapsLock = (e) => {
    const getModifierState =
      e?.getModifierState || e?.nativeEvent?.getModifierState;
    setCapsLock(
      typeof getModifierState === "function"
        ? getModifierState.call(e, "CapsLock")
        : false
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      console.log("Usuario:", data.user);
      window.location.href = "/home";
    } catch (error) {
      setLoginError(t("login.invalid"));
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="titulo-login">{t("login.title")}</h1>
        <Link to="/home"><button className="btn-volver"><img src="http://zent.es/imagenes_producto/Logo.png" alt="Logo" /></button></Link>
        <form className="formulario" onSubmit={handleSubmit}>
          <input className="caixa"  type="email"value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("login.email")} />
          <div className="password-wrapper">
            <div className="password-row">
              <input className="caixa" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} onKeyUp={updateCapsLock} onFocus={updateCapsLock} onBlur={() => setCapsLock(false)} placeholder={t("login.password")}/>

              <button type="button" className="btn-ojo" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? t("login.hidePassword") : t("login.showPassword")}>
                <span className="material-symbols-outlined">{showPassword ? "visibility_off" : "visibility"}</span>
              </button>
            </div>
            {capsLock && (
              <p className="aviso-capslock"><span className="material-symbols-outlined aviso-icon">keyboard_capslock</span>   {t("login.capsLock")}</p>
            )}
            {loginError && <span className="aviso">{loginError}</span>}
          </div>
          <Link to="/forgot-password" style={{textDecoration: "none"}}>{t("login.forgotPassword")}</Link>
          <div className="Botones">
            <button type="submit" className="btn-login"> {t("login.submit")} </button>
             <Link to="/register"> <button type="button" className="btn-registro">{t("login.register")}</button></Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
