import "./MisDatos.less";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MisDatos() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    password_errors: []
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [strength, setStrength] = useState(0);

  const strengthText = [
    "",
    "Muy débil",
    "Débil",
    "Media",
    "Fuerte"
  ];

  // 🔹 Cargar perfil
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const loadProfile = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/perfil", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        let data = {};
        try {
          data = await res.json();
        } catch {}

        if (!res.ok) {
          throw new Error("No se pudieron cargar los datos.");
        }

        setForm((prev) => ({
          ...prev,
          name: data.user?.name ?? "",
          email: data.user?.email ?? "",
        }));
      } catch {
        setError("Error cargando perfil");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  // 🔹 Inputs normales
  const onChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setMessage("");
  };

  // 🔹 Password con validación (igual que Register)
  const handlePasswordChange = (value) => {
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
      errors.push("❌ Debe tener una mayúscula");
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

    setForm((prev) => ({
      ...prev,
      password: value,
      password_errors: errors
    }));

    setError("");
    setMessage("");
  };

  // 🔹 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");
    setMessage("");

    // validar confirmación
    if (form.password && form.password !== form.password_confirmation) {
      setError("Las contraseñas no coinciden");
      setSaving(false);
      return;
    }

    // validar fuerza
    if (form.password && strength < 4) {
      setError("La contraseña no cumple los requisitos");
      setSaving(false);
      return;
    }

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
      };

      if (form.password.trim() !== "") {
        payload.password = form.password;
        payload.password_confirmation = form.password_confirmation;
      }

      const res = await fetch("http://localhost:8000/api/perfil/actualizar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(payload),
      });

      let data = {};
      try {
        data = await res.json();
      } catch {}

      if (res.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (!res.ok) {
        if (data.errors) {
          const firstError = Object.values(data.errors)[0]?.[0];
          throw new Error(firstError);
        }

        throw new Error(data.error || "No se pudo guardar.");
      }

      setMessage(data.msg || "Datos actualizados correctamente.");

      setForm((prev) => ({
        ...prev,
        password: "",
        password_confirmation: "",
        password_errors: []
      }));

      setStrength(0);

    } catch (err) {
      setError(err.message || "Error al guardar datos.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Cargando tus datos...</p>;

  const isDisabled = saving || !form.name.trim() || !form.email.trim();

  return (
    <section className="MisDatos">
      <div className="MisDatos-card">
        <div className="MisDatos-head">
          <h1>Mis datos</h1>
          <p className="MisDatos-subtitle">
            Actualiza tu información personal y, si quieres, cambia tu contraseña.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="MisDatos-form">

          <div className="MisDatos-field">
            <label>Usuario</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={onChange}
              required
            />
          </div>

          <div className="MisDatos-field">
            <label>Correo</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              required
            />
          </div>

          <div className="MisDatos-field">
            <label>Contraseña</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              placeholder="Nueva contraseña (opcional)"
            />

            {form.password && (
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

                <div className="error">
                  {form.password_errors.map((err, i) => (
                    <p key={i}>{err}</p>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="MisDatos-field">
            <label>Confirmar contraseña</label>
            <input
              type="password"
              name="password_confirmation"
              value={form.password_confirmation}
              onChange={onChange}
            />
          </div>

          <button type="submit" disabled={isDisabled}>
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>

        </form>

        {message && <p className="ok-msg">{message}</p>}
        {error && <p className="error-msg">{error}</p>}
      </div>
    </section>
  );
}

export default MisDatos;