import "./Header.css"
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function Header() {
  const token = localStorage.getItem("token");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const cartRef = useRef(null);

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

  // Cerrar carrito cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cargar carrito del localStorage
  useEffect(() => {
    const cart = localStorage.getItem("carrito");
    if (cart) {
      setCartItems(JSON.parse(cart));
    }
  }, []);
  

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
        <Link to="/merchan"><button className="menu-btn">MERCHANDISING</button></Link>
        <Link to="/conocenos"><button className="menu-btn">CONOCENOS</button></Link>
        <Link to="/oulet"><button className="menu-btn">OUTLET</button></Link>
      </div>

      {/* MENÚ DESKTOP */}
      <div className="Barra-menu-desktop">
        <Link to="/videojuegos"><button className="menu-btn">VIDEOJUEGOS</button></Link>
        <Link to="/consolas"><button className="menu-btn">CONSOLAS</button></Link>
        <Link to="/merchan"><button className="menu-btn">MERCHANDISING</button></Link>
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
            <div className="cart-container" ref={cartRef}>
              <button 
                className="btn-carrito"
                onClick={() => setCartOpen(!cartOpen)}
              >
                <img src="/imagesideas/carrito.png" />
                {cartItems.length > 0 && (
                  <span className="cart-badge">{cartItems.length}</span>
                )}
              </button>

              {/* MINI CARRITO DESPLEGABLE */}
              {cartOpen && (
                <div className="mini-cart">
                  <h3>Mi Carrito</h3>
                  {cartItems.length === 0 ? (
                    <p className="empty-cart">Tu carrito está vacío</p>
                  ) : (
                    <>
                      <div className="cart-items">
                        {cartItems.map((item, index) => (
                          <div key={index} className="cart-item">
                            <img src={item.imagen} alt={item.nombre} />
                            <div className="item-info">
                              <p className="item-nombre">{item.nombre}</p>
                              <p className="item-cantidad">Cantidad: {item.cantidad}</p>
                              <p className="item-precio">${item.precio}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Link to="/carrito">
                        <button className="btn-ir-carrito">Ir al Carrito</button>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

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