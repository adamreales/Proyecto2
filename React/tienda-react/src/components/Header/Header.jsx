import "./Header.css"
import { Link } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useHeaderCart } from "./Header.js";

function Header() {
  const token = localStorage.getItem("token");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const cartRef = useRef(null);
  const { t, i18n } = useTranslation();
  const { cartItems, totalItems, totalPrecio, eliminarProducto } = useHeaderCart();

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

  return (
    <header>

      {/* HAMBURGUESA MOBILE */}
      <button   className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>  ☰</button>

      {/* LOGO */}
      <div className="Logo">
        <Link to="/">
          <button id="btn-logo">
            <img src="http://zent.es/imagenes_producto/Logo.png" />
          </button>
        </Link>
      </div>

      {/* MENÚ MOBILE */}
      <div className={`Barra-menu ${menuOpen ? "active" : ""}`}>
        <button className="cerrar-btn" onClick={() => setMenuOpen(false)}>✕</button>
        <Link to="/"><button className="menu-btn">{t("header.nav.home")}</button></Link>
        <Link to="/videojuegos"><button className="menu-btn">{t("header.nav.videogames")}</button></Link>
        <Link to="/blog"><button className="menu-btn">{t("header.nav.blog")}</button></Link>
        <Link to="/conocenos"><button className="menu-btn">{t("header.nav.about")}</button></Link>
        {token && (
          <Link to="/favoritos"><button className="menu-btn">{t("header.nav.favorites")}</button></Link>
        )}
      </div>

      {/* MENÚ DESKTOP */}
      <div className="Barra-menu-desktop">
        <Link to="/"><button className="menu-btn">{t("header.nav.home")}</button></Link>
        <Link to="/videojuegos"><button className="menu-btn">{t("header.nav.videogames")}</button></Link>
        <Link to="/blog"><button className="menu-btn">{t("header.nav.blog")}</button></Link>
        <Link to="/conocenos"><button className="menu-btn">{t("header.nav.about")}</button></Link>
        {token && (
          <Link to="/favoritos"><button className="menu-btn">{t("header.nav.favorites")}</button></Link>
        )}
      </div>

      {/* LOGIN + CARRITO */}
      <div className="Login">
        {!token && (
          <>
            <Link to="/login"><button className="Log">{t("header.login")}</button></Link>
            <Link to="/register"><button className="Reg">{t("header.register")}</button></Link>
          </>
        )}

        <div className="cart-container" ref={cartRef}>
          <button 
            className="btn-carrito"
            onClick={() => setCartOpen(!cartOpen)}
          >
            <img src="http://zent.es/imagenes_producto/carrito.png" />
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </button>
          <div className="idiomas">
                    <button className="btn-idioma" type="button" onClick={() => i18n.changeLanguage("es")}>ES</button>
                    <button className="btn-idioma" type="button" onClick={() => i18n.changeLanguage("en")}>EN</button>
                    <button className="btn-idioma" type="button" onClick={() => i18n.changeLanguage("cat")}>CAT</button>
          </div>

          {/* MINI CARRITO */}
          {cartOpen && (
            <div className="mini-cart">
              <h3>{t("header.myCart")}</h3>

              {cartItems.length === 0 ? (
                <p className="empty-cart">{t("header.emptyCart")}</p>
              ) : (
                <>
                  <div className="cart-items">
                    {cartItems.map((item) => (
                      <div key={item.id} className="cart-item">
                        <img src={item.imagen} alt={item.nombre} />

                        <div className="item-info">
                          <p className="item-nombre">{item.nombre}</p>
                          <p className="item-cantidad">{t("header.quantity")}: {item.cantidad}</p>
                          <p className="item-precio">{item.precio}€</p>
                        </div>

                        <button 
                          className="btn-delete"
                          onClick={() => eliminarProducto(item)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>

                  <p className="total">   {t("header.total")} : {cartItems.reduce((total, item) => total + item.precio * item.cantidad, 0)}€      </p>
  
                  <Link to="/carrito">
                    <button className="btn-ir-carrito">{t("header.goToCart")}</button>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>

        {token && (
          <Link to="/profile">
            <button className="btn-perfil">
              <img src="http://zent.es/imagenes_producto/perfil.png" />
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;