import axios from "axios";

const API_URL = "http://localhost:8000/api/";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const anadirValoracion = async ({ id_producto, estrellas, comentario }) => {
  const response = await axios.post(
    `${API_URL}anadir_valoracion`,
    { id_producto, estrellas, comentario },
    { headers: getAuthHeaders() }
  );

  return response.data;
};

export const getMisValoraciones = async () => {
  const response = await axios.get(`${API_URL}mis_valoraciones`, {
    headers: getAuthHeaders(),
  });

  return response.data;
};

export const getPuedeValorar = async (productoId) => {
  const response = await axios.get(`${API_URL}puede_valorar/${productoId}`, {
    headers: getAuthHeaders(),
  });

  return response.data;
};
