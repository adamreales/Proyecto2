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
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const loadProfile = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/perfil", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        if (!res.ok) throw new Error("No se pudieron cargar los datos.");

        const data = await res.json();

        setForm((prev) => ({
          ...prev,
          name: data.user?.name ?? "",
          email: data.user?.email ?? "",
        }));
      } catch (e) {
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [navigate, token]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const payload = {
        name: form.name,
        email: form.email,
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

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          const firstError = Object.values(data.errors)[0]?.[0];
          throw new Error(firstError || "No se pudo guardar.");
        }

        throw new Error(data.error || "No se pudo guardar.");
      }

      setMessage(data.msg || "Datos actualizados correctamente.");
      setForm((prev) => ({ ...prev, password: "", password_confirmation: "" }));
    } catch (err) {
      setError(err.message || "Error al guardar datos.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Cargando tus datos...</p>;

  return (
      <section className="MisDatos">
        <div className="MisDatos-card">
          <div className="MisDatos-head">
            <h1>Mis datos</h1>
            <p className="MisDatos-subtitle">Actualiza tu información personal y, si quieres, cambia tu contraseña.</p>
          </div>

          <form onSubmit={handleSubmit} className="MisDatos-form">
            <div className="MisDatos-field">
              <label htmlFor="name">Usuario</label>
              <input id="name" type="text" name="name" value={form.name} onChange={onChange} placeholder="Nombre" required />
            </div>

            <div className="MisDatos-field">
              <label htmlFor="email">Correo</label>
              <input id="email" type="email" name="email" value={form.email} onChange={onChange} placeholder="Correo electrónico" required />
            </div>

            <div className="MisDatos-field">
              <label htmlFor="password">Contraseña</label>
              <input id="password" type="password" name="password" value={form.password} onChange={onChange} placeholder="Nueva contraseña (opcional)" />
            </div>

            <div className="MisDatos-field">
              <label htmlFor="password_confirmation">Confirmar contraseña</label>
              <input id="password_confirmation" type="password" name="password_confirmation" value={form.password_confirmation} onChange={onChange} placeholder="Confirmar nueva contraseña" />
            </div>

            <button type="submit" className="btn-guardar" disabled={saving}>{saving ? "Guardando..." : "Guardar cambios"}</button>
          </form>

          {message && <p className="ok-msg">{message}</p>}
          {error && <p className="error-msg">{error}</p>}
        </div>
      </section>
  );
}

export default MisDatos;