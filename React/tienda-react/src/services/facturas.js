import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getFacturas = async () => {
  const response = await axios.get(`${API_URL}facturas`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const descargarFacturaPdf = async (facturaId) => {
  const response = await axios.get(`${API_URL}facturas/${facturaId}/pdf`, {
    headers: getAuthHeaders(),
    responseType: 'blob',
  });

  const contentType = response.headers['content-type'] || '';
  if (!contentType.includes('application/pdf')) {
    throw new Error('La respuesta no es un PDF valido.');
  }

  const disposition = response.headers['content-disposition'] || '';
  const filenameMatch = disposition.match(/filename="?([^";]+)"?/i);
  const filename = filenameMatch?.[1] || `factura-${facturaId}.pdf`;

  const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};
