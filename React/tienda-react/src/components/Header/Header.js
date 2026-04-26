import { useState, useEffect, useCallback, useRef } from "react";

export function useHeaderCart() {
  const [cartItems, setCartItems] = useState([]);
  const pendingQuantityUpdatesRef = useRef(new Set());

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
      const plataformaProducto =
        item.do_plataforma_producto || item.doPlataformaProducto || {};
      const producto =
        item.producto ||
        plataformaProducto.do_producto ||
        plataformaProducto.doProducto ||
        item.do_producto ||
        item.doProducto ||
        {};
      const plataforma =
        item.plataforma_relacion ||
        plataformaProducto.do_plataforma ||
        plataformaProducto.doPlataforma ||
        item.do_plataforma ||
        item.doPlataforma ||
        {};
      const imagenes = producto.do_imagenes || producto.doImagenes || [];
      const imagenRaw = item.imagen || imagenes[0]?.url || "";
      const imagenUrl = imagenRaw
        ? `http://zent.es/${String(imagenRaw).replace(/^\/+/, "")}`
        : "";
      const stockValue = Number(
        plataformaProducto.stock ??
        producto.stock ??
          producto.cantidad_stock ??
          producto.unidades ??
          item.stock ??
          0
      );
      const stock = stockValue > 0 ? stockValue : 1;
      const idProducto = Number(item.id_producto ?? producto.id ?? 0);
      const plataformaId = Number(
        item.id_plataforma ??
          item.plataforma_id ??
          plataformaProducto.plataforma_id ??
          plataforma.id ??
          0
      ) || null;
      const plataformaProductoId = Number(
        item.plataforma_producto_id ??
          item.producto_plataforma_id ??
          plataformaProducto.id ??
          item.relacion_id ??
          plataforma.pivot?.plataforma_producto_id ??
          plataforma.pivot?.id ??
          item.pivot?.plataforma_producto_id ??
          item.pivot?.id ??
          0
      ) || null;
      const lineaId = String(
        item.id ?? `${idProducto}-${plataformaProductoId ?? plataformaId ?? "base"}`
      );

      return {
        id: lineaId,
        idProducto,
        plataformaId,
        plataformaProductoId,
        plataforma: item.plataforma || plataforma.nombre || "PC",
        nombre: item.nombre || producto.titulo || "Producto",
        precio: Number(item.precio ?? producto.precio) || 0,
        cantidad: Number(item.cantidad) || 0,
        imagen: imagenUrl,
        stock,
      };
    }).filter((item) => item.idProducto && item.plataformaId);
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
          "X-Session-Id": sessionId,
          Authorization: token ? `Bearer ${token}` : "",
        }
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
      const producto = typeof id === "object" ? id : { id: id };
      const token = localStorage.getItem("token");
      const sessionId = getSessionId();
      const body = {};

      if (producto.id) {
        body.id_item = producto.id;
      }

      if (producto.idProducto) {
        body.id_producto = producto.idProducto;
      }

      if (producto.plataformaId) {
        body.id_plataforma = producto.plataformaId;
      }

      if (producto.plataformaProductoId) {
        body.plataforma_producto_id = producto.plataformaProductoId;
      }

      const res = await fetch("http://localhost:8000/api/quitar_carrito", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Session-Id": sessionId,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(body),
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

  const actualizarCantidad = useCallback(async (producto, nuevaCantidad) => {
    const item = cartItems.find(i => i.id === producto.id);
    if (!item) return;

    const stockMaximo = Math.max(1, Number(item.stock) || 1);
    const cantidadClampeada = Math.max(1, Math.min(Number(nuevaCantidad) || 1, stockMaximo));

    if (cantidadClampeada === item.cantidad) return;
    if (pendingQuantityUpdatesRef.current.has(item.id)) return;

    pendingQuantityUpdatesRef.current.add(item.id);

    // Actualización optimista para UI fluida
    setCartItems(prev => prev.map(i => i.id === item.id ? { ...i, cantidad: cantidadClampeada } : i));

    try {
      const token = localStorage.getItem("token");
      const sessionId = getSessionId();
      const headers = {
        "Content-Type": "application/json",
        "X-Session-Id": sessionId,
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      };
      const payloadBase = {
        id_item: item.id,
        id_producto: item.idProducto,
      };

      if (item.plataformaId) {
        payloadBase.id_plataforma = item.plataformaId;
      }

      if (item.plataformaProductoId) {
        payloadBase.plataforma_producto_id = item.plataformaProductoId;
      }

      const delta = cantidadClampeada - item.cantidad;

      if (delta > 0) {
        // Aumentar: enviar solo el delta
        const res = await fetch("http://localhost:8000/api/anadir_carrito", {
          method: "POST",
          headers,
          body: JSON.stringify({ ...payloadBase, cantidad: delta }),
        });
        const data = await parseJsonSafe(res);
        if (!res.ok) throw new Error(data.error || "No se pudo actualizar");
      } else {
        // Reducir: borrar ítem y volver a añadir con la cantidad nueva
        const resQuitar = await fetch("http://localhost:8000/api/quitar_carrito", {
          method: "POST",
          headers,
          body: JSON.stringify(payloadBase),
        });
        const dataQuitar = await parseJsonSafe(resQuitar);
        if (!resQuitar.ok) throw new Error(dataQuitar.error || "No se pudo quitar");

        const resAnadir = await fetch("http://localhost:8000/api/anadir_carrito", {
          method: "POST",
          headers,
          body: JSON.stringify({ ...payloadBase, cantidad: cantidadClampeada }),
        });
        const dataAnadir = await parseJsonSafe(resAnadir);
        if (!resAnadir.ok) throw new Error(dataAnadir.error || "No se pudo actualizar");
      }

      await loadCart();
    } catch (error) {
      console.error("Error al actualizar cantidad:", error);
      await loadCart(); // Revertir recargando desde el backend
    } finally {
      pendingQuantityUpdatesRef.current.delete(item.id);
    }
  }, [cartItems, loadCart]);

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
    actualizarCantidad,
  };
}