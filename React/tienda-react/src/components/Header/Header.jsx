import "./Header.css"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {
  const token = localStorage.getItem("token");
  const [menuOpen, setMenuOpen] = useState(false);

  // Cerrar menú cuando la pantalla sea mayor a 768px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);
  

  return (
    <header>

      {/* HAMBURGUESA MOBILE */}
      <button 
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* LOGO SOLO DESKTOP */}
      <div className="Logo">
        <Link to="/">
          <button id="btn-logo">
            <img src="/imagesideas/Logo.png" />
          </button>
        </Link>
      </div>

      {/* MENÚ LATERAL MOBILE */}
      <div className={`Barra-menu ${menuOpen ? "active" : ""}`}>
        <button className="cerrar-btn" onClick={() => setMenuOpen(false)}>✕</button>

        <Link to="/"><button className="menu-btn">HOME</button></Link>
        <Link to="/videojuegos"><button className="menu-btn">VIDEOJUEGOS</button></Link>
        <Link to="/consolas"><button className="menu-btn">CONSOLAS</button></Link>
        <button className="menu-btn">MERCHANDISING</button>
        <Link to="/conocenos"><button className="menu-btn">CONOCENOS</button></Link>
        <Link to="/oulet"><button className="menu-btn">OUTLET</button></Link>
      </div>

      {/* MENÚ DESKTOP */}
      <div className="Barra-menu-desktop">
        <Link to="/videojuegos"><button className="menu-btn">VIDEOJUEGOS</button></Link>
        <Link to="/consolas"><button className="menu-btn">CONSOLAS</button></Link>
        <button className="menu-btn">MERCHANDISING</button>
        <Link to="/conocenos"><button className="menu-btn">CONOCENOS</button></Link>
        <Link to="/oulet"><button className="menu-btn">OUTLET</button></Link>
      </div>

      {/* PERFIL + CARRITO */}
      <div className="Login">
        {!token && (
          <>
            <Link to="/login"><button className="Log">Login</button></Link>
            <Link to="/register"><button className="Reg">Registrate</button></Link>
          </>
        )}

        {token && (
          <>
            <Link to="/carrito">
              <button className="btn-carrito">
                <img src="/imagesideas/carrito.png" />
              </button>
            </Link>

            <Link to="/profile">
              <button className="btn-perfil">
                <img src="/imagesideas/perfil.png" />
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;