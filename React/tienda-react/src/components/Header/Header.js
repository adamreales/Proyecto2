import { useState, useEffect, useCallback } from "react";

export function useHeaderCart() {
  const [cartItems, setCartItems] = useState([]);

  const parseJsonSafe = async (res) => {
    const raw = await res.text();
    try {
      return JSON.parse(raw);
    } catch {
      throw new Error("La API devolvió HTML/no JSON. Revisa errores en Laravel/PHP.");
    }
  };

  const getSessionId = () => {
    let sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem("sessionId", sessionId);
    }
    return sessionId;
  };

  const mapCartItems = (items = []) => {
    return items.map((item) => {
      const producto = item.do_producto || item.doProducto || {};
      const imagenes = producto.do_imagenes || producto.doImagenes || [];
      const imagenUrl = imagenes[0]?.url
        ? `http://zent.es/${imagenes[0].url}`
        : "";
      const stockValue = Number(
        producto.stock ??
          producto.cantidad_stock ??
          producto.unidades ??
          item.stock ??
          0
      );
      const stock = stockValue > 0 ? stockValue : Number(item.cantidad) || 1;

      return {
        id: item.id_producto,
        nombre: producto.titulo || "Producto",
        precio: Number(producto.precio) || 0,
        cantidad: Number(item.cantidad) || 0,
        imagen: imagenUrl,
        stock,
      };
    });
  };

  /*
    Nombre: loadCart
    Descripción: Solicita el carrito al backend y lo carga
                 en el estado de React.
  */
  const loadCart = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const sessionId = getSessionId();

      const res = await fetch("http://localhost:8000/api/ver_carrito", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ session_id: sessionId }),
      });

      const data = await parseJsonSafe(res);

      if (!res.ok) {
        throw new Error(data.error || "No se pudo cargar el carrito");
      }

      setCartItems(mapCartItems(data.carrito || []));

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
      const sessionId = getSessionId();

      const res = await fetch("http://localhost:8000/api/quitar_carrito", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          id_producto: id,
          session_id: sessionId,
        }),
      });

      const data = await parseJsonSafe(res);

      if (!res.ok) {
        throw new Error(data.error || "No se pudo eliminar el producto");
      }

      // Notificar a todas las vistas del carrito para que recarguen
      window.dispatchEvent(new Event("carritoActualizado"));

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