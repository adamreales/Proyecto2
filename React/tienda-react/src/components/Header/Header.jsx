import "./Header.css"
import { Link } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";

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

  const loadCart = useCallback(() => {
    const cart = localStorage.getItem("carrito");
    if (cart) {
      setCartItems(JSON.parse(cart));
      return;
    }
    setCartItems([]);
  }, []);

  // Cargar carrito del localStorage
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // Escuchar cambios del carrito
  useEffect(() => {
    const handleCartUpdate = () => loadCart();

    window.addEventListener("carritoActualizado", handleCartUpdate);
    window.addEventListener("storage", handleCartUpdate);

    return () => {
      window.removeEventListener("carritoActualizado", handleCartUpdate);
      window.removeEventListener("storage", handleCartUpdate);
    };
  }, [loadCart]);

  // ELIMINAR PRODUCTO
  const eliminarProducto = (id) => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const nuevoCarrito = carrito.filter(item => item.id !== id);

    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    setCartItems(nuevoCarrito);

    window.dispatchEvent(new Event("carritoActualizado"));
  };

  // CONTADOR REAL DE PRODUCTOS
  const totalItems = cartItems.reduce((total, item) => total + item.cantidad, 0);

  return (
    <header>

      {/* HAMBURGUESA MOBILE */}
      <button 
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* LOGO */}
      <div className="Logo">
        <Link to="/">
          <button id="btn-logo">
            <img src="/imagesideas/Logo.png" />
          </button>
        </Link>
      </div>

      {/* MENÚ MOBILE */}
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

      {/* LOGIN + CARRITO */}
      <div className="Login">
        {!token && (
          <>
            <Link to="/login"><button className="Log">Login</button></Link>
            <Link to="/register"><button className="Reg">Registrate</button></Link>
          </>
        )}

        <div className="cart-container" ref={cartRef}>
          <button 
            className="btn-carrito"
            onClick={() => setCartOpen(!cartOpen)}
          >
            <img src="/imagesideas/carrito.png" />
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </button>

          {/* MINI CARRITO */}
          {cartOpen && (
            <div className="mini-cart">
              <h3>Mi Carrito</h3>

              {cartItems.length === 0 ? (
                <p className="empty-cart">Tu carrito está vacío</p>
              ) : (
                <>
                  <div className="cart-items">
                    {cartItems.map((item) => (
                      <div key={item.id} className="cart-item">
                        <img src={item.imagen} alt={item.nombre} />

                        <div className="item-info">
                          <p className="item-nombre">{item.nombre}</p>
                          <p className="item-cantidad">Cantidad: {item.cantidad}</p>
                          <p className="item-precio">{item.precio}€</p>
                        </div>

                        <button 
                          className="btn-delete"
                          onClick={() => eliminarProducto(item.id)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>

                  <p className="total">
                    Total : {cartItems.reduce((total, item) => total + item.precio * item.cantidad, 0)}€
                  </p>

                  <Link to="/carrito">
                    <button className="btn-ir-carrito">Ir al Carrito</button>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>

        {token && (
          <Link to="/profile">
            <button className="btn-perfil">
              <img src="/imagesideas/perfil.png" />
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;