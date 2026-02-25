export const GENEROS = [
    "Acción",
    "Aventura",
    "RPG",
    "Deportes",
    "Estrategia",
    "Simulación",
    "Carreras",
];

export const normalizarTexto = (texto = "") =>
    texto
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();

export function filtrarYOrdenarVideojuegos(productos = [], filtros = {}) {
    const {
        generoSeleccionado = null,
        precioMin = "",
        precioMax = "",
        ordenPrecio = "ninguno",
    } = filtros;

    const precioMinNumero = precioMin === "" ? null : Number(precioMin);
    const precioMaxNumero = precioMax === "" ? null : Number(precioMax);

    let resultado = productos
        .filter((producto) => Boolean(producto?.do_juego))
        .filter((producto) => {
            if (!generoSeleccionado) return true;
            const categorias = producto?.do_categorias || [];
            return categorias.some(
                (categoria) =>
                    normalizarTexto(categoria?.nombre) === normalizarTexto(generoSeleccionado)
            );
        })
        .filter((producto) => {
            const precio = Number(producto?.precio);
            if (Number.isNaN(precio)) return false;
            if (precioMinNumero !== null && precio < precioMinNumero) return false;
            if (precioMaxNumero !== null && precio > precioMaxNumero) return false;
            return true;
        });

    if (ordenPrecio === "asc") {
        resultado = [...resultado].sort((a, b) => Number(a.precio) - Number(b.precio));
    }

    if (ordenPrecio === "desc") {
        resultado = [...resultado].sort((a, b) => Number(b.precio) - Number(a.precio));
    }

    return resultado;
}