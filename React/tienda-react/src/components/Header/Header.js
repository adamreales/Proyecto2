import { useState, useEffect, useCallback } from "react";

export function useHeaderCart() {
  const [cartItems, setCartItems] = useState([]);

  /*
    Nombre: loadCart
    Descripción: Solicita el carrito al backend y lo carga
                 en el estado de React.
  */
  const loadCart = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const sessionId = localStorage.getItem("sessionId");

      const res = await fetch("http://localhost:8000/api/ver_carrito", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
          "x-session-id": sessionId || ""
        }
      });

      const data = await res.json();

      // El backend debe devolver: { items: [...] }
      setCartItems(data.items || []);

    } catch (error) {
      console.error("Error al cargar el carrito:", error);
      setCartItems([]);
    }
  }, []);

  // Cargar carrito al montar (equivalente a f_main en React)
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // Escuchar actualizaciones globales
  useEffect(() => {
    const handleCartUpdate = () => loadCart();

    window.addEventListener("carritoActualizado", handleCartUpdate);

    return () => {
      window.removeEventListener("carritoActualizado", handleCartUpdate);
    };
  }, [loadCart]);

  /*
    Nombre: eliminarProducto
    Descripción: Elimina un producto del carrito en el BACKEND
                 y luego recarga el carrito desde la API.
  */
  const eliminarProducto = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const sessionId = localStorage.getItem("sessionId");

      await fetch(`http://localhost:8000/api/eliminar_producto/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
          "x-session-id": sessionId || ""
        }
      });

      // Recargar carrito desde backend (fuente real)
      await loadCart();

    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  const totalItems = cartItems.reduce(
    (total, item) => total + (item.cantidad || 0),
    0
  );

  const totalPrecio = cartItems.reduce(
    (total, item) => total + (item.precio * (item.cantidad || 0)),
    0
  );

  return {
    cartItems,
    totalItems,
    totalPrecio,
    eliminarProducto,
  };
}