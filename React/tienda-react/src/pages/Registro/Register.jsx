import "./Register.css";
import { useState } from "react";
import { register } from "../../services/auth";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: [],
    passwordConfirm: ""
    });
  const [strength, setStrength] = useState(0);

    const strengthText = [
    "",
    "Muy débil",
    "Débil",
    "Media",
    "Fuerte"
    ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({
    name: "",
    email: "",
    password: [],
    passwordConfirm: ""
    });

    let newErrors = {
    name: "",
    email: "",
    password: [],
    passwordConfirm: ""
    };

    if(name.trim().length < 3){
        newErrors.name = "❌ Minimo 3 caracteres";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        newErrors.email = "❌ Email no válido";
    }

    if (password !== passwordConfirm) {
        newErrors.passwordConfirm = "❌ Las contraseñas no coinciden";
    }

    if (
        newErrors.name ||
        newErrors.email ||
        newErrors.passwordConfirm ||
        errors.password.length > 0
        ) {
        setErrors((prev) => ({
            ...prev,
            ...newErrors
        }));
        return;
    }

    try {
        const res = await register(name, email, password, passwordConfirm);

        console.log("Registro OK:", res);

        window.location.href = "/login";

    } catch (error) {
        console.log(error);

        setErrors((prev) => ({
            ...prev,
            email: error.response?.data?.error || "Error al registrarse"
        }));
    }

  };

  return (
    <div className="login-page">
      <div className="login-container">

        <h1 className="titulo-login">Regístrate</h1>

        <Link to="/home"><button className="btn-volver"><img src="http://zent.es/imagenes_producto/Logo.png" alt="Logo" /></button></Link>

        <form className="formulario" onSubmit={handleSubmit}>
         
          <input type="text" className="caixa" value={name}onChange={(e) => setName(e.target.value)} placeholder="Nombre :"
            onChange={(e) => {
            const value = e.target.value;
            setName(value);

            let error = "";

            if (value.trim().length < 3) {
                error = "❌ Minimo 3 caracteres";
            }else{
                error = "✔️ Minimo 3 caracteres";
            }

            setErrors((prev) => ({
                ...prev,
                name: error
            }));
            }}
           required/>
          
            {errors.name && (
            <p className="error">{errors.name}</p>
            )}
   
          <input type="email" className="caixa" value={email} 
            onChange={(e) => {
            const value = e.target.value;
            setEmail(value);

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            let error = "";

            if (!emailRegex.test(value)) {
                error = "❌ Email no válido";
            }else{
                error = "✔️ Email válido";
            }

            setErrors((prev) => ({
                ...prev,
                email: error
            }));
            }}
          placeholder="Email : " required />

            {errors.email && (
            <p className="error">{errors.email}</p>
            )}

          <div className="password-wrapper">
            <div className="password-row">
              <input
                type={showPassword ? "text" : "password"} className="caixa"
                value={password}
                id="password"
                onChange={(e) => {
                    const value = e.target.value;
                    setPassword(value);

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
                        errors.push("❌Debe tener una mayúscula");
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
                    
                    setErrors((prev) => ({
                        ...prev,
                        password: errors
                    }));
                }}
                placeholder="Contraseña : "
                required
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
            
            <div className="estado_contra">
                <p className="strength-text">
                    {strengthText[strength]}
                </p>
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
                    ></div>
                </div>
            </div>
            {errors.password.length > 0 && (
            <div className="error">
                {errors.password.map((err, i) => (
                <p key={i}>{err}</p>
                ))}
            </div>
            )}
          </div>

          <div className="password-wrapper">
            <div className="password-row">
              <input
                type={showPasswordConfirm ? "text" : "password"} className="caixa"
                value={passwordConfirm}
                onChange={(e) => {
                    const value = e.target.value;
                    setPasswordConfirm(value);

                    let error = "";

                    if (value !== password) {
                        error = "❌ Las contraseñas no coinciden";
                    }else{
                        error = "✔️ Las contraseñas coinciden";
                    }

                    setErrors((prev) => ({
                        ...prev,
                        passwordConfirm: error
                    }));
                }}
                placeholder="Confirmar contraseña : "
                required
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
          </div>
            {errors.passwordConfirm && (
            <p className="error">{errors.passwordConfirm}</p>
            )}

          <div className="Botones">
            <button type="submit" className="btn-registro"> Registrarse</button>
          </div>
        </form>
        
      </div>
    </div>
  );
}

export default Register;
