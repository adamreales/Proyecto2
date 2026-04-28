import "./MisDatos.less";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function MisDatos() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { t } = useTranslation();

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

        if (!res.ok) throw new Error(t("myData.loadError"));

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
          throw new Error(firstError || t("myData.saveError"));
        }

        throw new Error(data.error || t("myData.saveError"));
      }

      setMessage(data.msg || t("myData.success"));
      setForm((prev) => ({ ...prev, password: "", password_confirmation: "" }));
    } catch (err) {
      setError(err.message || t("myData.genericSaveError"));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>{t("myData.loading")}</p>;

  return (
      <section className="MisDatos">
        <div className="MisDatos-card">
          <div className="MisDatos-head">
            <h1>{t("myData.title")}</h1>
            <p className="MisDatos-subtitle">{t("myData.subtitle")}</p>
          </div>

          <form onSubmit={handleSubmit} className="MisDatos-form">
            <div className="MisDatos-field">
              <label htmlFor="name">{t("myData.userLabel")}</label>
              <input id="name" type="text" name="name" value={form.name} onChange={onChange} placeholder={t("myData.namePlaceholder")} required />
            </div>

            <div className="MisDatos-field">
              <label htmlFor="email">{t("myData.emailLabel")}</label>
              <input id="email" type="email" name="email" value={form.email} onChange={onChange} placeholder={t("myData.emailPlaceholder")} required />
            </div>

            <div className="MisDatos-field">
              <label htmlFor="password">{t("myData.passwordLabel")}</label>
              <input id="password" type="password" name="password" value={form.password} onChange={onChange} placeholder={t("myData.passwordPlaceholder")} />
            </div>

            <div className="MisDatos-field">
              <label htmlFor="password_confirmation">{t("myData.confirmPasswordLabel")}</label>
              <input id="password_confirmation" type="password" name="password_confirmation" value={form.password_confirmation} onChange={onChange} placeholder={t("myData.confirmPasswordPlaceholder")} />
            </div>

            <button type="submit" className="btn-guardar" disabled={saving}>{saving ? t("myData.saving") : t("myData.save")}</button>
          </form>

          {message && <p className="ok-msg">{message}</p>}
          {error && <p className="error-msg">{error}</p>}
        </div>
      </section>
  );
}

export default MisDatos;